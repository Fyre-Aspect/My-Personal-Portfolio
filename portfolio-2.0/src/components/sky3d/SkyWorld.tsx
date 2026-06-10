'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';
import styles from './SkyWorld.module.css';

const SKY_URL = '/fantasy_sky_background.glb';
const TOWER_URL = '/skyscraper.glb';

useGLTF.preload(SKY_URL);
useGLTF.preload(TOWER_URL);

/* ------------------------------------------------------------------ helpers */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* Deterministic RNG so the procedural city/clouds are identical every load. */
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

/* Three-stop time-of-day palette: bright sunrise morning at the top of the
   page, golden sunset midway, and a deep dusk (sun on the ocean horizon) at
   the arrival. mix3 walks a color through the three keys. */
const DAWN = {
  fog: new THREE.Color('#cde2f6'),
  hemiSky: new THREE.Color('#eaf4ff'),
  hemiGround: new THREE.Color('#6b7280'),
  sun: new THREE.Color('#fff3d8'),
  skyTint: new THREE.Color('#fff4e4'),
  ground: new THREE.Color('#5d6678'),
  ocean: new THREE.Color('#2a5c8a'),
};
const SUNSET = {
  fog: new THREE.Color('#ff9a55'),
  hemiSky: new THREE.Color('#ffb066'),
  hemiGround: new THREE.Color('#3a2230'),
  sun: new THREE.Color('#ff7a30'),
  skyTint: new THREE.Color('#ffb98c'),
  ground: new THREE.Color('#332a36'),
  ocean: new THREE.Color('#274064'),
};
const DUSK = {
  fog: new THREE.Color('#8a4a55'),
  hemiSky: new THREE.Color('#525d8f'),
  hemiGround: new THREE.Color('#1c1626'),
  sun: new THREE.Color('#ff5a2a'),
  skyTint: new THREE.Color('#6f7bb8'),
  ground: new THREE.Color('#10141f'),
  ocean: new THREE.Color('#13223e'),
};

function mix3(out: THREE.Color, a: THREE.Color, b: THREE.Color, c: THREE.Color, w: number) {
  if (w < 0.5) out.copy(a).lerp(b, w * 2);
  else out.copy(b).lerp(c, (w - 0.5) * 2);
  return out;
}

/* Shared scroll progress: 0 at the top of the page, 1 at the bottom. Written by
   a passive window-scroll listener into a ref so the camera reads it in the
   render loop without forcing React re-renders. */
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

/* The fantasy panorama. The GLB ships the equirectangular sky as an embedded
   texture that isn't bound to any material slot, so we pull texture 0 straight
   from the loader's parser and wrap it on an un-fogged BackSide sphere that
   re-centres on the camera every frame — an always-surrounding skydome. A clone
   of the same texture is turned into a PMREM environment so the towers' glass
   and the ocean reflect the sky. The tint walks bright-morning → sunset →
   dusk-blue, which is what turns the one panorama into a full day cycle. */
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
      const w = smoothstep(0.08, 0.96, progress.current);
      mix3(matRef.current.color, DAWN.skyTint, SUNSET.skyTint, DUSK.skyTint, w);
    }
  });

  if (!tex) return null;
  return (
    // Rotated to push the panorama's dark zenith seam off the forward axis.
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

/* The sun: an additive billboard riding inside a camera-following group, so it
   behaves like part of the skydome. It starts high (bright morning) and sinks
   to the horizon dead ahead (-z) — exactly where the finale camera looks
   between the towers, putting the setting sun on the ocean. */
function SunDisc({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null!);
  const sprite = useRef<THREE.Sprite>(null!);
  const horizon = useRef<THREE.Sprite>(null!);
  const tex = useMemo(() => makeGlowTexture(), []);

  useFrame(({ camera }) => {
    const w = smoothstep(0.05, 0.96, progress.current);
    group.current.position.copy(camera.position);
    // Ends left of frame-centre so the finale's CTA text doesn't sit on top
    // of the sun — it reads as the sun setting beside the headline.
    const x = lerp(900, -210, w);
    const y = lerp(1750, 120, w);
    const z = -3100;
    sprite.current.position.set(x, y, z);
    const s = lerp(950, 2000, w);
    sprite.current.scale.set(s, s, 1);
    const mat = sprite.current.material as THREE.SpriteMaterial;
    mix3(mat.color, DAWN.sun, SUNSET.sun, DUSK.sun, w);
    // Wide band of sunset light hugging the ocean horizon, fading in as the
    // sun gets low so the finale reads unmistakably as sunset over water.
    horizon.current.position.set(x * 0.6, 40, z);
    const hMat = horizon.current.material as THREE.SpriteMaterial;
    hMat.opacity = smoothstep(0.5, 0.9, progress.current) * 0.85;
    mix3(hMat.color, SUNSET.sun, SUNSET.sun, DUSK.sun, w);
  });

  return (
    <group ref={group}>
      <sprite ref={sprite}>
        <spriteMaterial
          map={tex}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          fog={false}
          toneMapped={false}
        />
      </sprite>
      <sprite ref={horizon} scale={[5200, 640, 1]}>
        <spriteMaterial
          map={tex}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          fog={false}
          toneMapped={false}
          opacity={0}
        />
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
  // A handful of soft overlapping blobs reads as one cumulus puff.
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

/* A few volumetric-looking cumulus clouds built from camera-facing sprites
   (5–7 puffs each). They live at the start altitude so the visitor opens the
   page floating among them, drift slowly, warm up with the palette, and fade
   out once the descent passes them so the city stays clean. */
function CloudField({ progress }: { progress: ProgressRef }) {
  const tex = useMemo(() => makePuffTexture(), []);
  const group = useRef<THREE.Group>(null!);
  const mats = useRef<{ m: THREE.SpriteMaterial; base: number }[]>([]);

  const clouds = useMemo(() => {
    const rnd = mulberry32(42);
    const clusters: { pos: [number, number, number]; puffs: { o: [number, number, number]; s: number; op: number }[] }[] = [];
    // Up-forward of the opening camera (which starts at ~(12, 330, 430)
    // gazing upward), so the visitor opens the page floating among them.
    const spots: [number, number, number][] = [
      [-300, 480, -60], [240, 560, -180], [-110, 430, -320], [360, 460, 40],
      [-380, 620, -240], [70, 660, -120], [170, 500, -420],
    ];
    for (const pos of spots) {
      const puffs = [] as { o: [number, number, number]; s: number; op: number }[];
      const n = 5 + Math.floor(rnd() * 3);
      for (let i = 0; i < n; i++) {
        puffs.push({
          o: [(rnd() - 0.5) * 150, (rnd() - 0.5) * 40, (rnd() - 0.5) * 90],
          s: 85 + rnd() * 110,
          op: 0.5 + rnd() * 0.35,
        });
      }
      clusters.push({ pos, puffs });
    }
    return clusters;
  }, []);

  useFrame(({ clock }) => {
    const p = progress.current;
    // Gone by the time the city reveal starts.
    const vis = 1 - smoothstep(0.3, 0.55, p);
    const warm = smoothstep(0.05, 0.5, p);
    const t = clock.elapsedTime;
    if (group.current) group.current.position.x = Math.sin(t * 0.05) * 8;
    for (const { m, base } of mats.current) {
      m.opacity = base * vis;
      m.color.setRGB(1, lerp(1, 0.86, warm), lerp(1, 0.74, warm));
    }
  });

  return (
    <group ref={group}>
      {clouds.map((cl, ci) => (
        <group key={ci} position={cl.pos}>
          {cl.puffs.map((pf, pi) => (
            <sprite key={pi} position={pf.o} scale={[pf.s * 1.7, pf.s, 1]}>
              <spriteMaterial
                ref={(m) => {
                  if (m) mats.current.push({ m, base: pf.op });
                }}
                map={tex}
                transparent
                depthWrite={false}
                opacity={pf.op}
              />
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

/* The city below: one InstancedMesh of ~260 window-textured blocks scattered
   on a street grid around and behind the two hero towers (the canyon corridor
   and the camera's approach lane stay clear). Window emissive ramps up as the
   day fades, so the midway top-down reveal reads as a city waking up for the
   evening. Single draw call. */
function City({ progress }: { progress: ProgressRef }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const tex = useMemo(() => makeFacadeTexture(), []);

  const { count, matrices } = useMemo(() => {
    const rnd = mulberry32(2024);
    const m: THREE.Matrix4[] = [];
    const tmp = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    for (let gx = -780; gx <= 780; gx += 52) {
      for (let gz = -600; gz <= 120; gz += 52) {
        // A clear avenue runs the canyon straight to the waterfront, so the
        // finale's view between the towers reaches the ocean. Thin the grid
        // out randomly so it feels organic, not minecrafty.
        if (Math.abs(gx) < 78) continue;
        if (rnd() < 0.38) continue;
        const x = gx + (rnd() - 0.5) * 22;
        const z = gz + (rnd() - 0.5) * 22;
        const near = 1 - clamp01((Math.abs(x) + Math.abs(z)) / 1500);
        const h = 12 + rnd() * rnd() * (40 + near * 75);
        const w = 14 + rnd() * 14;
        const d = 14 + rnd() * 14;
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
    g.translate(0, 0.5, 0); // origin at the base so scale-y = height
    return g;
  }, []);

  useFrame(() => {
    if (!matRef.current) return;
    const w = smoothstep(0.2, 0.95, progress.current);
    matRef.current.emissiveIntensity = lerp(0.05, 1.7, w);
  });

  return (
    <instancedMesh ref={meshRef} args={[geo, undefined, count]}>
      <meshStandardMaterial
        ref={matRef}
        map={tex}
        emissive="#ffc88a"
        emissiveMap={tex}
        emissiveIntensity={0.05}
        roughness={0.85}
        metalness={0.15}
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------- ground & ocean */

/* Dark city ground that ends where the water begins, then a reflective ocean
   plane running to the foggy horizon — the finale's distant sunset seascape.
   A long additive glow strip lays the setting sun's glitter path on the water. */
function GroundAndOcean({ progress }: { progress: ProgressRef }) {
  const groundMat = useRef<THREE.MeshStandardMaterial>(null!);
  const oceanMat = useRef<THREE.MeshStandardMaterial>(null!);
  const glintMat = useRef<THREE.MeshBasicMaterial>(null!);
  const glowTex = useMemo(() => makeGlowTexture(128), []);

  useFrame(() => {
    const w = smoothstep(0.1, 0.95, progress.current);
    if (groundMat.current) mix3(groundMat.current.color, DAWN.ground, SUNSET.ground, DUSK.ground, w);
    if (oceanMat.current) mix3(oceanMat.current.color, DAWN.ocean, SUNSET.ocean, DUSK.ocean, w);
    if (glintMat.current) glintMat.current.opacity = smoothstep(0.45, 0.92, progress.current) * 0.9;
  });

  return (
    <group>
      {/* city ground slab — the waterfront sits just past the city's back row */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 40]}>
        <planeGeometry args={[2400, 1400]} />
        <meshStandardMaterial ref={groundMat} roughness={0.95} metalness={0} />
      </mesh>
      {/* ocean from the waterfront to the foggy horizon */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, -4700]}>
        <planeGeometry args={[12000, 8200]} />
        <meshStandardMaterial ref={oceanMat} roughness={0.22} metalness={0.85} envMapIntensity={1.3} />
      </mesh>
      {/* setting sun's glitter path on the water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-210, 0.2, -2100]}>
        <planeGeometry args={[260, 2600]} />
        <meshBasicMaterial
          ref={glintMat}
          map={glowTex}
          color="#ff8a3a"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------- skyscrapers */

/* Recenters the building model to the origin (footprint centred in X/Z, base on
   y=0) and scales it to a target height, so two instances can be placed
   symmetrically to form a canyon the camera dives between. */
function useTowerNorm() {
  const { scene } = useGLTF(TOWER_URL);
  return useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const targetHeight = 175;
    const scale = targetHeight / size.y;

    // Make the glass/metal catch the sky environment, and brighten the lit
    // windows so they read as a city at dusk.
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const m = mesh.material as THREE.MeshStandardMaterial | undefined;
      if (!m) return;
      m.envMapIntensity = 1.15;
      if (m.emissive && (m.emissiveIntensity ?? 0) > 0) {
        m.emissiveIntensity = Math.max(m.emissiveIntensity, 1.4);
      }
    });

    return {
      scale,
      offset: new THREE.Vector3(-center.x, -box.min.y, -center.z),
      footprint: new THREE.Vector2(size.x * scale, size.z * scale),
    };
  }, [scene]);
}

function Skyscrapers() {
  const { scene } = useGLTF(TOWER_URL);
  const norm = useTowerNorm();
  const gap = 48; // distance between the two tower centres

  return (
    <group>
      {/* Left tower */}
      <group position={[-gap / 2, 0, 0]} scale={norm.scale}>
        <group position={norm.offset.toArray()}>
          <Clone object={scene} />
        </group>
      </group>
      {/* Right tower — spun 180° so its lit face turns into the canyon */}
      <group position={[gap / 2, 0, 0]} rotation={[0, Math.PI, 0]} scale={norm.scale}>
        <group position={norm.offset.toArray()}>
          <Clone object={scene} />
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------ camera director */

/* Scroll = one continuous cinematic descent in four beats:
   1. open floating in bright morning sky among the clouds (no city yet),
   2. tip over into an angled top-down reveal of the city far below,
   3. swoop toward the two hero towers as the light goes golden,
   4. settle low in the canyon between them at dusk, looking out at the
      setting sun over the ocean — where the closing text lands.
   Position and look-at each ride a Catmull-Rom curve; the eased progress is
   lerp-smoothed so scrolling feels weighty rather than 1:1 twitchy. */
function CameraDirector({ progress }: { progress: ProgressRef }) {
  const { camera } = useThree();

  const posCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(12, 330, 430),
          new THREE.Vector3(26, 268, 330),
          new THREE.Vector3(42, 196, 238),
          new THREE.Vector3(16, 96, 132),
          new THREE.Vector3(0, 40, 56),
        ],
        false,
        'catmullrom',
        0.5,
      ),
    [],
  );
  const lookCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 1000, -500),  // gazing up into open sky — ground out of frame
          new THREE.Vector3(0, 430, -480),   // tilting down through the cloud layer
          new THREE.Vector3(-14, 16, -300),  // angled top-down city reveal
          new THREE.Vector3(0, 58, -170),    // locking onto the canyon
          new THREE.Vector3(0, 60, -420),    // between the towers, out to the ocean sunset
        ],
        false,
        'catmullrom',
        0.5,
      ),
    [],
  );

  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const smoothed = useRef(0);

  useFrame(() => {
    smoothed.current += (progress.current - smoothed.current) * 0.09;
    // The arrival (camera fully between the towers) lands when the closing CTA
    // is on screen (~92% scroll); the empty page-tail past that just holds.
    const t = easeInOutCubic(clamp01(smoothed.current / 0.92));
    posCurve.getPoint(t, pos.current);
    lookCurve.getPoint(t, look.current);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);
    if (process.env.NODE_ENV !== 'production') {
      (window as unknown as Record<string, unknown>).__skycam = {
        p: progress.current, t, pos: pos.current.toArray(), look: look.current.toArray(),
      };
    }
  });

  return null;
}

/* --------------------------------------------------------------- atmosphere */

/* Lights + fog that walk morning → sunset → dusk as the descent progresses. */
function Atmosphere({ progress }: { progress: ProgressRef }) {
  const { scene } = useThree();
  const hemi = useRef<THREE.HemisphereLight>(null!);
  const dir = useRef<THREE.DirectionalLight>(null!);
  // Distance haze: far enough out that the ocean horizon stays visible from
  // the canyon, near enough to soften the city's back rows.
  const fog = useMemo(() => new THREE.Fog(DAWN.fog.getHex(), 220, 2600), []);

  useEffect(() => {
    scene.fog = fog;
    return () => {
      if (scene.fog === fog) scene.fog = null;
    };
  }, [scene, fog]);

  useFrame(() => {
    const w = smoothstep(0.08, 0.96, progress.current);
    mix3(fog.color, DAWN.fog, SUNSET.fog, DUSK.fog, w);
    if (hemi.current) {
      mix3(hemi.current.color, DAWN.hemiSky, SUNSET.hemiSky, DUSK.hemiSky, w);
      mix3(hemi.current.groundColor, DAWN.hemiGround, SUNSET.hemiGround, DUSK.hemiGround, w);
      hemi.current.intensity = lerp(1.2, 0.55, w);
    }
    if (dir.current) {
      mix3(dir.current.color, DAWN.sun, SUNSET.sun, DUSK.sun, w);
      // The key light sinks from high morning toward a low raking sunset
      // straight up the canyon (-z), matching the visible sun disc.
      dir.current.position.set(lerp(170, 0, w), lerp(300, 42, w), lerp(140, -260, w));
      dir.current.intensity = lerp(2.4, 2.9, w);
    }
  });

  return (
    <>
      <hemisphereLight ref={hemi} intensity={1.2} />
      <directionalLight ref={dir} intensity={2.4} />
      <ambientLight intensity={0.35} />
    </>
  );
}

/* --------------------------------------------------------------------- root */

export default function SkyWorld() {
  const progress = useScrollProgress();
  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ fov: 58, near: 1, far: 9000, position: [12, 330, 430] }}
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
          <CloudField progress={progress} />
          <City progress={progress} />
          <GroundAndOcean progress={progress} />
          <Skyscrapers />
          <CameraDirector progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
