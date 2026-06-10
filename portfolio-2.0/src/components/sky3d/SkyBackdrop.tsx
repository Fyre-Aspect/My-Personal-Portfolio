'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from './SkyWorld.module.css';

/**
 * The calm cousin of SkyWorld. Content pages (projects / achievements /
 * activities / contact) get the same real WebGL sky as the homepage — the
 * fantasy panorama dome, a low sunset sun, drifting volumetric clouds and a
 * distant lit-city silhouette on the horizon — but the camera just floats above
 * a sea of clouds at golden hour and drifts gently, instead of diving a canyon.
 * No 26MB skyscraper GLB here: the city is one instanced silhouette, so every
 * content page stays light. Fixed full-viewport behind the page (z-index 0).
 */

const SKY_URL = '/fantasy_sky_background.glb';
useGLTF.preload(SKY_URL);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* A fixed golden-hour → dusk mood. Content pages hold a warm sunset rather than
   running the homepage's full day cycle, so the look stays consistent while you
   read; a faint scroll tint keeps it alive. */
const GOLD = {
  fog: new THREE.Color('#ff8a44'),
  hemiSky: new THREE.Color('#ffb070'),
  hemiGround: new THREE.Color('#48304a'),
  sun: new THREE.Color('#ff9230'),
  // The dome tint stays cool: orange × the teal panorama turns olive-green, so
  // a lavender multiply reads as a clean twilight sky while the sun / fog /
  // horizon band carry the sunset warmth.
  skyTint: new THREE.Color('#aab0d8'),
};
const DUSK = {
  fog: new THREE.Color('#9a4a52'),
  hemiSky: new THREE.Color('#6a5f96'),
  hemiGround: new THREE.Color('#241a30'),
  sun: new THREE.Color('#ff5e28'),
  skyTint: new THREE.Color('#6f6796'),
};

function useScrollProgress() {
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? clamp01(window.scrollY / max) : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return ref;
}

type ProgressRef = React.MutableRefObject<number>;

/* ----------------------------------------------------------------- sky dome */

function SkyDome({ progress }: { progress: ProgressRef }) {
  const gltf = useGLTF(SKY_URL);
  const { gl, scene: rootScene } = useThree();
  const groupRef = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.MeshBasicMaterial>(null!);
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let alive = true;
    const parser = (gltf as unknown as { parser: { getDependency: (t: string, i: number) => Promise<THREE.Texture> } }).parser;
    parser.getDependency('texture', 0).then((t) => {
      if (!alive) return;
      t.colorSpace = THREE.SRGBColorSpace;
      t.mapping = THREE.UVMapping;
      t.needsUpdate = true;
      setTex(t);
    });
    return () => {
      alive = false;
    };
  }, [gltf]);

  useEffect(() => {
    if (!tex) return;
    const eq = tex.clone();
    eq.mapping = THREE.EquirectangularReflectionMapping;
    eq.colorSpace = THREE.SRGBColorSpace;
    eq.needsUpdate = true;
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromEquirectangular(eq).texture;
    rootScene.environment = env;
    pmrem.dispose();
    eq.dispose();
    return () => {
      if (rootScene.environment === env) rootScene.environment = null;
      env.dispose();
    };
  }, [tex, gl, rootScene]);

  useFrame(({ camera }) => {
    if (groupRef.current) groupRef.current.position.copy(camera.position);
    if (matRef.current) {
      matRef.current.color.copy(GOLD.skyTint).lerp(DUSK.skyTint, smoothstep(0, 1, progress.current));
    }
  });

  if (!tex) return null;
  return (
    <group ref={groupRef} rotation={[0, 2.1, 0]}>
      <mesh>
        <sphereGeometry args={[4000, 60, 40]} />
        <meshBasicMaterial
          ref={matRef}
          map={tex}
          side={THREE.BackSide}
          fog={false}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ----------------------------------------------------------------------- sun */

function makeGlowTexture(size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,244,214,0.95)');
  g.addColorStop(0.45, 'rgba(255,200,140,0.32)');
  g.addColorStop(1, 'rgba(255,170,90,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* A low sunset sun sitting on the horizon ahead of the camera, with a wide band
   of light hugging the horizon line. Rides a camera-following group. */
function SunDisc({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null!);
  const sun = useRef<THREE.Sprite>(null!);
  const band = useRef<THREE.Sprite>(null!);
  const tex = useMemo(() => makeGlowTexture(), []);

  useFrame(({ camera, clock }) => {
    group.current.position.copy(camera.position);
    const w = smoothstep(0, 1, progress.current);
    const y = lerp(220, 110, w) + Math.sin(clock.elapsedTime * 0.05) * 4;
    sun.current.position.set(-150, y, -3100);
    const sMat = sun.current.material as THREE.SpriteMaterial;
    sMat.color.copy(GOLD.sun).lerp(DUSK.sun, w);
    band.current.position.set(-60, 120, -3100);
    const bMat = band.current.material as THREE.SpriteMaterial;
    bMat.color.copy(GOLD.sun).lerp(DUSK.sun, w);
  });

  return (
    <group ref={group}>
      <sprite ref={sun} scale={[1900, 1900, 1]}>
        <spriteMaterial map={tex} blending={THREE.AdditiveBlending} depthWrite={false} depthTest={false} fog={false} toneMapped={false} />
      </sprite>
      <sprite ref={band} scale={[6400, 720, 1]}>
        <spriteMaterial map={tex} blending={THREE.AdditiveBlending} depthWrite={false} depthTest={false} fog={false} toneMapped={false} opacity={0.85} />
      </sprite>
    </group>
  );
}

/* -------------------------------------------------------------------- clouds */

function makePuffTexture(size = 256, seed = 7) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const rnd = mulberry32(seed);
  for (let i = 0; i < 14; i++) {
    const x = size * (0.25 + rnd() * 0.5);
    const y = size * (0.3 + rnd() * 0.4);
    const r = size * (0.12 + rnd() * 0.2);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.55)');
    g.addColorStop(0.6, 'rgba(255,255,255,0.18)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* A sea of cumulus clouds spread below and around the camera — the visitor
   floats above them. They drift slowly and are warm-lit by the sunset. */
function CloudField() {
  const tex = useMemo(() => makePuffTexture(), []);
  const group = useRef<THREE.Group>(null!);

  const clouds = useMemo(() => {
    const rnd = mulberry32(42);
    const clusters: { pos: [number, number, number]; puffs: { o: [number, number, number]; s: number; op: number }[] }[] = [];
    for (let i = 0; i < 14; i++) {
      const pos: [number, number, number] = [
        (rnd() - 0.5) * 1400,
        -40 - rnd() * 160,
        -200 - rnd() * 1600,
      ];
      const puffs = [] as { o: [number, number, number]; s: number; op: number }[];
      const n = 5 + Math.floor(rnd() * 3);
      for (let j = 0; j < n; j++) {
        puffs.push({
          o: [(rnd() - 0.5) * 170, (rnd() - 0.5) * 44, (rnd() - 0.5) * 100],
          s: 95 + rnd() * 130,
          op: 0.45 + rnd() * 0.35,
        });
      }
      clusters.push({ pos, puffs });
    }
    return clusters;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.position.x = Math.sin(clock.elapsedTime * 0.04) * 14;
  });

  return (
    <group ref={group}>
      {clouds.map((cl, ci) => (
        <group key={ci} position={cl.pos}>
          {cl.puffs.map((pf, pi) => (
            <sprite key={pi} position={pf.o} scale={[pf.s * 1.7, pf.s, 1]}>
              <spriteMaterial map={tex} transparent depthWrite={false} opacity={pf.op} color="#ffe6cf" />
            </sprite>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------------- city */

function makeFacadeTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#10141f';
  ctx.fillRect(0, 0, 64, 128);
  const rnd = mulberry32(1337);
  for (let y = 4; y < 124; y += 7) {
    for (let x = 4; x < 60; x += 8) {
      if (rnd() < 0.42) {
        ctx.fillStyle = rnd() < 0.75 ? '#ffd9a0' : '#bcd6ff';
        ctx.fillRect(x, y, 4, 3);
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* A distant city silhouette strung along the horizon below the sun — one
   InstancedMesh of window-lit blocks. Single draw call. */
function DistantCity() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tex = useMemo(() => makeFacadeTexture(), []);

  const { count, matrices } = useMemo(() => {
    const rnd = mulberry32(2024);
    const m: THREE.Matrix4[] = [];
    const tmp = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    // A tight band of blocks far out on the horizon, dead ahead under the sun,
    // so they read as a distant skyline rather than clutter at the frame edges.
    for (let row = 0; row < 3; row++) {
      const z = -2700 + row * 220;
      for (let gx = -1100; gx <= 1100; gx += 52) {
        if (rnd() < 0.22) continue;
        const x = gx + (rnd() - 0.5) * 26;
        const h = 60 + rnd() * rnd() * 300;
        const w = 30 + rnd() * 36;
        const d = 30 + rnd() * 36;
        tmp.compose(new THREE.Vector3(x, 0, z), q, new THREE.Vector3(w, h, d));
        m.push(tmp.clone());
      }
    }
    return { count: m.length, matrices: m };
  }, []);

  useEffect(() => {
    const mesh = meshRef.current;
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  const geo = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 1, 1);
    g.translate(0, 0.5, 0);
    return g;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[geo, undefined, count]}>
      <meshStandardMaterial
        map={tex}
        emissive="#ffc88a"
        emissiveMap={tex}
        emissiveIntensity={0.9}
        roughness={0.85}
        metalness={0.15}
      />
    </instancedMesh>
  );
}

/* --------------------------------------------------------------- atmosphere */

function Atmosphere({ progress }: { progress: ProgressRef }) {
  const { scene } = useThree();
  const hemi = useRef<THREE.HemisphereLight>(null!);
  const dir = useRef<THREE.DirectionalLight>(null!);
  const fog = useMemo(() => new THREE.Fog(GOLD.fog.getHex(), 600, 3400), []);

  useEffect(() => {
    scene.fog = fog;
    return () => {
      if (scene.fog === fog) scene.fog = null;
    };
  }, [scene, fog]);

  useFrame(() => {
    const w = smoothstep(0, 1, progress.current);
    fog.color.copy(GOLD.fog).lerp(DUSK.fog, w);
    if (hemi.current) {
      hemi.current.color.copy(GOLD.hemiSky).lerp(DUSK.hemiSky, w);
      hemi.current.groundColor.copy(GOLD.hemiGround).lerp(DUSK.hemiGround, w);
    }
    if (dir.current) {
      dir.current.color.copy(GOLD.sun).lerp(DUSK.sun, w);
    }
  });

  return (
    <>
      <hemisphereLight ref={hemi} intensity={1.1} />
      <directionalLight ref={dir} intensity={2.4} position={[-200, 90, -260]} />
      <ambientLight intensity={0.4} />
    </>
  );
}

/* ----------------------------------------------------------- camera (drift) */

/* The camera floats above the clouds looking out at the sunset city. It drifts
   gently on its own and gets a very small scroll parallax — enough to feel
   alive, never a dive. */
function CameraDrift({ progress }: { progress: ProgressRef }) {
  const { camera } = useThree();
  const smoothed = useRef(0);

  useFrame(({ clock }) => {
    smoothed.current += (progress.current - smoothed.current) * 0.08;
    const p = smoothed.current;
    const t = clock.elapsedTime;
    camera.position.set(
      Math.sin(t * 0.04) * 18,
      lerp(200, 150, p) + Math.sin(t * 0.06) * 5,
      lerp(420, 320, p),
    );
    // Look down toward the horizon so the warm lower sky + skyline fill the
    // frame and only a sliver of the cool zenith shows up top.
    camera.lookAt(0, lerp(70, 40, p), -2500);
  });

  return null;
}

/* --------------------------------------------------------------------- root */

export default function SkyBackdrop() {
  const progress = useScrollProgress();
  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ fov: 60, near: 1, far: 9000, position: [0, 120, 360] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <Atmosphere progress={progress} />
          <SkyDome progress={progress} />
          <SunDisc progress={progress} />
          <CloudField />
          <DistantCity />
          <CameraDrift progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
