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

/* Day → sunset palette. The journey lerps from the cool key on the left to the
   warm key on the right as the visitor scrolls down toward the city. */
const COOL = {
  fog: new THREE.Color('#b9d6f0'),
  hemiSky: new THREE.Color('#dCEBFF'),
  hemiGround: new THREE.Color('#5b6472'),
  sun: new THREE.Color('#fff2da'),
  skyTint: new THREE.Color('#ffffff'),
};
const WARM = {
  fog: new THREE.Color('#ff8a4c'),
  hemiSky: new THREE.Color('#ffb066'),
  hemiGround: new THREE.Color('#3a2230'),
  sun: new THREE.Color('#ff6a26'),
  skyTint: new THREE.Color('#ffc09a'),
};

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
   and metal reflect the sky. */
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
      const w = smoothstep(0.12, 1, progress.current);
      matRef.current.color.copy(COOL.skyTint).lerp(WARM.skyTint, w);
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

/* Scroll drives one continuous cinematic descent: starting high and angled
   above the two centred towers, sweeping down and forward, and settling low in
   the canyon between them — the page's "arrival". Position and look-at each ride
   a Catmull-Rom curve; the eased progress is lerp-smoothed so scrolling feels
   weighty rather than 1:1 twitchy. */
function CameraDirector({ progress }: { progress: ProgressRef }) {
  const { camera } = useThree();

  // The descent hugs the two towers the whole way down: it begins high and
  // angled with both towers ahead and centred, sweeps down the canyon as they
  // grow and spread to the frame edges, and settles low between them looking up.
  const posCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(34, 232, 158),
          new THREE.Vector3(22, 168, 122),
          new THREE.Vector3(11, 112, 88),
          new THREE.Vector3(3, 62, 70),
          new THREE.Vector3(0, 40, 50),
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
          new THREE.Vector3(0, 150, -30),
          new THREE.Vector3(0, 118, -55),
          new THREE.Vector3(0, 88, -78),
          new THREE.Vector3(0, 66, -100),
          new THREE.Vector3(0, 64, -130),
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
  });

  return null;
}

/* --------------------------------------------------------------- atmosphere */

/* Lights + fog that lerp cool daylight → warm sunset as the descent progresses. */
function Atmosphere({ progress }: { progress: ProgressRef }) {
  const { scene } = useThree();
  const hemi = useRef<THREE.HemisphereLight>(null!);
  const dir = useRef<THREE.DirectionalLight>(null!);
  // Light, distance-only haze — keeps the towers crisp up close and only tints
  // the far horizon, so the descent never washes out into fog.
  const fog = useMemo(() => new THREE.Fog(COOL.fog.getHex(), 180, 1100), []);

  useEffect(() => {
    scene.fog = fog;
    return () => {
      if (scene.fog === fog) scene.fog = null;
    };
  }, [scene, fog]);

  useFrame(() => {
    const w = smoothstep(0.1, 1, progress.current);
    fog.color.copy(COOL.fog).lerp(WARM.fog, w);
    if (hemi.current) {
      hemi.current.color.copy(COOL.hemiSky).lerp(WARM.hemiSky, w);
      hemi.current.groundColor.copy(COOL.hemiGround).lerp(WARM.hemiGround, w);
    }
    if (dir.current) {
      dir.current.color.copy(COOL.sun).lerp(WARM.sun, w);
      // The key light sinks from high noon toward a low raking sunset.
      dir.current.position.set(lerp(150, 190, w), lerp(290, 64, w), lerp(120, -170, w));
      dir.current.intensity = lerp(2.3, 3.1, w);
    }
  });

  return (
    <>
      <hemisphereLight ref={hemi} intensity={1.15} />
      <directionalLight ref={dir} intensity={2.6} />
      <ambientLight intensity={0.4} />
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
        camera={{ fov: 58, near: 1, far: 9000, position: [90, 285, 300] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <Atmosphere progress={progress} />
          <SkyDome progress={progress} />
          <Skyscrapers />
          <CameraDirector progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
