'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from './SkyscraperRide.module.css';

/**
 * Experiences backdrop: a scroll-driven climb up a glass skyscraper, set in the
 * SAME warm fantasy-sunset world as every other page — the same panorama sky
 * dome, low golden sun, drifting clouds and warm fog used by the homepage and
 * the content-page SkyBackdrop. The only difference is the camera: instead of
 * floating above the clouds it spirals UP the tower as you scroll, and the
 * tower's glass reflects the sunset sky.
 */
const SKY_URL = '/fantasy_sky_background.glb';
const TOWER_URL = '/skyscraper.glb';

useGLTF.preload(SKY_URL);
useGLTF.preload(TOWER_URL);

// Scroll smoothing: ease the live scroll toward the rendered ascent so the climb
// feels weighty rather than snapping 1:1 with the wheel.
const RIDE_EASE = 0.06;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
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

/* A fixed golden-hour → dusk mood, identical to the content-page SkyBackdrop so
   the Experiences sky reads as the same world. */
const GOLD = {
  fog: new THREE.Color('#ff8a44'),
  hemiSky: new THREE.Color('#ffb070'),
  hemiGround: new THREE.Color('#48304a'),
  sun: new THREE.Color('#ff9230'),
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

/* The fantasy panorama, pulled straight off the GLB's embedded texture, wrapped
   on a huge BackSide sphere that re-centres on the camera each frame, plus a
   PMREM environment so the tower's glass reflects the same sky. */
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

/* Low sunset sun + a wide horizon band, riding a camera-following group so it
   behaves like part of the sky. */
function SunDisc({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null!);
  const sun = useRef<THREE.Sprite>(null!);
  const band = useRef<THREE.Sprite>(null!);
  const tex = useMemo(() => makeGlowTexture(), []);

  useFrame(({ camera, clock }) => {
    group.current.position.copy(camera.position);
    const w = smoothstep(0, 1, progress.current);
    const y = lerp(360, 150, w) + Math.sin(clock.elapsedTime * 0.05) * 4;
    sun.current.position.set(-260, y, -3100);
    const sMat = sun.current.material as THREE.SpriteMaterial;
    sMat.color.copy(GOLD.sun).lerp(DUSK.sun, w);
    band.current.position.set(-120, 150, -3100);
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

/* A ring of cumulus clouds spread around and below the tower so the climb reads
   as rising up through the same cloud sea as the rest of the site. */
function CloudField() {
  const tex = useMemo(() => makePuffTexture(), []);
  const group = useRef<THREE.Group>(null!);

  const clouds = useMemo(() => {
    const rnd = mulberry32(42);
    const clusters: { pos: [number, number, number]; puffs: { o: [number, number, number]; s: number; op: number }[] }[] = [];
    for (let i = 0; i < 18; i++) {
      const ang = rnd() * Math.PI * 2;
      const rad = 500 + rnd() * 1500;
      const pos: [number, number, number] = [
        Math.sin(ang) * rad,
        -120 - rnd() * 260 + (rnd() < 0.4 ? 360 : 0),
        Math.cos(ang) * rad,
      ];
      const puffs = [] as { o: [number, number, number]; s: number; op: number }[];
      const n = 5 + Math.floor(rnd() * 3);
      for (let j = 0; j < n; j++) {
        puffs.push({
          o: [(rnd() - 0.5) * 170, (rnd() - 0.5) * 44, (rnd() - 0.5) * 100],
          s: 95 + rnd() * 130,
          op: 0.4 + rnd() * 0.32,
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

/* --------------------------------------------------------------- atmosphere */

function Atmosphere({ progress }: { progress: ProgressRef }) {
  const { scene } = useThree();
  const hemi = useRef<THREE.HemisphereLight>(null!);
  const dir = useRef<THREE.DirectionalLight>(null!);
  // Pushed far out so the tower stays crisp; only the distant sky/clouds haze.
  const fog = useMemo(() => new THREE.Fog(GOLD.fog.getHex(), 1400, 5200), []);

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
      <hemisphereLight ref={hemi} intensity={1.15} />
      <directionalLight ref={dir} intensity={2.5} position={[-200, 160, -120]} />
      <ambientLight intensity={0.4} />
    </>
  );
}

/* --------------------------------------------------------------- the tower */

/* Measure the model's world bounds once so the climb adapts to its real
   scale/offset, then every frame spiral the camera up around the building's
   vertical axis: base → crown, sweeping ~135° around the facade and easing
   inward, always looking level into the glass so it reads as an ascent. */
function Tower({ progress }: { progress: ProgressRef }) {
  const { scene } = useGLTF(TOWER_URL);
  const { camera } = useThree();

  const bounds = useMemo(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.frustumCulled = false;
      const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
      const mats = Array.isArray(mat) ? mat : [mat];
      for (const m of mats) {
        if (!m) continue;
        if ('envMapIntensity' in m) m.envMapIntensity = 1.4;
        if ('emissive' in m && (m.emissiveIntensity ?? 0) > 0) {
          m.emissiveIntensity = Math.max(m.emissiveIntensity ?? 1, 1) * 1.4;
        }
      }
    });
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    return { center, size, minY: box.min.y, maxY: box.max.y };
  }, [scene]);

  const smoothed = useRef(0);
  const target = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const k = Math.min(delta * 60, 3);
    smoothed.current += (progress.current - smoothed.current) * RIDE_EASE * k;
    const t = clamp01(smoothed.current);
    const e = easeInOut(t);

    const { center, size, minY, maxY } = bounds;
    const span = maxY - minY;
    const horiz = Math.max(size.x, size.z);

    const angle = lerp(-0.7, 1.7, t); // ~135 degrees of sweep
    const radius = lerp(horiz * 3.2, horiz * 1.9, e); // pull inward near the top
    // Start well above the base (in line with the cloud bank below) and finish
    // at the crown, so the bottom of the tower is never in frame — it just rises
    // out of the clouds.
    const camY = lerp(minY + span * 0.2, maxY - span * 0.05, e);

    camera.position.set(
      center.x + Math.sin(angle) * radius,
      camY,
      center.z + Math.cos(angle) * radius,
    );

    const upOffset = lerp(span * 0.09, span * 0.02, e);
    target.current.set(center.x, camY + upOffset, center.z);
    camera.lookAt(target.current);
  });

  return <primitive object={scene} />;
}

/* A dense cloud bank wrapping the foot of the tower, so the building is lost in
   the cloud sea and you never see where it ends — the same "no floor" read as
   the homepage. Sized and placed from the model's own bounds. */
function BaseMist() {
  const { scene } = useGLTF(TOWER_URL);
  const tex = useMemo(() => makePuffTexture(256, 211), []);
  const group = useRef<THREE.Group>(null!);

  const puffs = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const c = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const minY = box.min.y;
    const horiz = Math.max(size.x, size.z);
    const rnd = mulberry32(211);
    const arr: { pos: [number, number, number]; s: number; op: number }[] = [];
    for (let i = 0; i < 150; i++) {
      const ang = rnd() * Math.PI * 2;
      // A wide cloud sea: dense and low around the base, thinning to a distant
      // deck on the horizon — the tower rises out of it so its bottom is never
      // visible. Far puffs are large (the horizon sea); near puffs stay short so
      // they sit below the camera instead of fogging the climb.
      const rad = (0.1 + rnd() * rnd() * 16) * horiz;
      arr.push({
        pos: [
          c.x + Math.sin(ang) * rad,
          minY + (rnd() * 0.6 - 0.25) * horiz,
          c.z + Math.cos(ang) * rad,
        ],
        s: horiz * 1.0 + rad * 0.55,
        op: 0.5 + rnd() * 0.42,
      });
    }
    return arr;
  }, [scene]);

  useFrame(({ clock }) => {
    if (group.current) group.current.position.x = Math.sin(clock.elapsedTime * 0.025) * 5;
  });

  return (
    <group ref={group}>
      {puffs.map((p, i) => (
        <sprite key={i} position={p.pos} scale={[p.s * 2.2, p.s * 0.55, 1]}>
          <spriteMaterial map={tex} transparent depthWrite={false} opacity={p.op} color="#ffe7cf" />
        </sprite>
      ))}
    </group>
  );
}

export default function SkyscraperRide() {
  const progress = useScrollProgress();
  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ fov: 60, near: 1, far: 9000 }}
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
          <Tower progress={progress} />
          <BaseMist />
        </Suspense>
      </Canvas>
      <div className={styles.scrim} />
    </div>
  );
}
