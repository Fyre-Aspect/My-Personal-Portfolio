'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from './SkyscraperRide.module.css';

// A 6MB Sketchfab cyberpunk skyscraper (7 meshes, ~62k tris, emissive/neon
// materials, no baked camera). Unlike the old coaster ride there's no animation
// to scrub — instead we fly our OWN camera up the tower as the page scrolls.
const MODEL_URL = '/cyberpunk_skyscraper.glb';

// Scroll smoothing: ease the live scroll toward the rendered ascent so the climb
// feels weighty rather than snapping 1:1 with the wheel.
const RIDE_EASE = 0.06;

useGLTF.preload(MODEL_URL);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Smoothstep-ish ease so the ascent starts and ends gently.
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/* Page scroll 0..1 (top..bottom), written into a ref by a passive listener so
   the render loop reads it without re-rendering React — same pattern the
   homepage SkyWorld and the old CoasterRide used. */
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

/* The tower + the camera that climbs it. We measure the model's world bounds
   once so the flight adapts to its real scale/offset, then every frame place the
   camera on a spiral around the building's vertical axis: as scroll goes 0->1 it
   rises from the base to the crown, sweeps ~125 degrees around the facade, and
   eases inward — always looking a little up the tower so it reads as an ascent. */
function Tower({ progress }: { progress: ProgressRef }) {
  const { scene } = useGLTF(MODEL_URL);
  const { camera } = useThree();

  // Make the neon read on a dark sky: lift emissive a touch and keep textures
  // crisp. (The export already carries emissive maps for the windows/signage.)
  const bounds = useMemo(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.frustumCulled = false;
      const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
      const mats = Array.isArray(mat) ? mat : [mat];
      for (const m of mats) {
        if (m && 'emissive' in m) {
          m.emissiveIntensity = Math.max(m.emissiveIntensity ?? 1, 1) * 1.6;
          m.toneMapped = true;
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
    // Normalize easing to 60fps and cap catch-up after the tab was backgrounded.
    const k = Math.min(delta * 60, 3);
    smoothed.current += (progress.current - smoothed.current) * RIDE_EASE * k;
    const t = clamp01(smoothed.current);
    const e = easeInOut(t);

    const { center, size, minY, maxY } = bounds;
    const span = maxY - minY;
    const horiz = Math.max(size.x, size.z);

    // Spiral around the tower's vertical axis.
    const angle = lerp(-0.55, 1.65, t); // ~125 degrees of sweep
    const radius = lerp(horiz * 2.7, horiz * 1.55, e); // pull inward near the top
    const camY = lerp(minY + span * 0.04, maxY - span * 0.06, e); // base -> crown

    camera.position.set(
      center.x + Math.sin(angle) * radius,
      camY,
      center.z + Math.cos(angle) * radius,
    );

    // Aim a little above the camera so we're always looking up the building;
    // level off as we reach the crown.
    const upOffset = lerp(span * 0.3, span * 0.05, e);
    target.current.set(center.x, camY + upOffset, center.z);
    camera.lookAt(target.current);
  });

  return <primitive object={scene} />;
}

/* Night-blue cyberpunk sky (vertical gradient baked into a CanvasTexture so it
   renders in-engine and fog can blend the base of the tower into the horizon),
   plus cool key/fill light and a cyan rim glow so the facade isn't flat. */
function Environment() {
  const { scene, gl } = useThree();
  useEffect(() => {
    const c = document.createElement('canvas');
    c.width = 8;
    c.height = 256;
    const ctx = c.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#05060f'); // deep space at the top
    g.addColorStop(0.42, '#0b1740');
    g.addColorStop(0.74, '#16306e');
    g.addColorStop(1, '#2a5cab'); // luminous blue horizon haze
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 8, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;

    const prevBg = scene.background;
    const prevFog = scene.fog;
    scene.background = tex;
    scene.fog = new THREE.Fog(new THREE.Color('#16306e').getHex(), 6, 26);
    gl.toneMappingExposure = 1.05;

    return () => {
      scene.background = prevBg;
      scene.fog = prevFog;
      tex.dispose();
    };
  }, [scene, gl]);

  return (
    <>
      <hemisphereLight args={['#9ec7ff', '#0a1024', 0.9]} />
      <directionalLight position={[6, 12, 4]} intensity={1.6} color="#cfe2ff" />
      <ambientLight intensity={0.35} />
      {/* Cyan rim from below-left for a neon city bounce. */}
      <pointLight position={[-4, -1, 3]} intensity={6} distance={18} color="#39d8ff" />
      <pointLight position={[3, 5, -3]} intensity={5} distance={18} color="#7a4bff" />
    </>
  );
}

export default function SkyscraperRide() {
  const progress = useScrollProgress();
  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 62, near: 0.05, far: 200 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <Environment />
          <Tower progress={progress} />
        </Suspense>
      </Canvas>
      <div className={styles.scrim} />
    </div>
  );
}
