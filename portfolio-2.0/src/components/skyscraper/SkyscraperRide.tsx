'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from './SkyscraperRide.module.css';

// A ~985-unit-tall realistic glass/metal/concrete skyscraper (8 meshes, ~33k
// tris). There's no baked camera or animation — instead we fly our OWN camera up
// the tower as the page scrolls, so the Experiences timeline reads as a climb.
// The tower's glass reflects a warm golden-hour sky environment so it sits in the
// same world as the rest of the site rather than the old cyberpunk-night look.
const MODEL_URL = '/skyscraper.glb';

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
   homepage SkyWorld and the SkyBackdrop use. */
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
   rises from the base to the crown, sweeps ~135 degrees around the facade, and
   eases inward — always looking level into the glass so it reads as an ascent. */
function Tower({ progress }: { progress: ProgressRef }) {
  const { scene } = useGLTF(MODEL_URL);
  const { camera } = useThree();

  // Let the glass/metal/windows catch the sky environment so the facade reads
  // as reflective glass at golden hour rather than a flat grey slab.
  const bounds = useMemo(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.frustumCulled = false;
      const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
      const mats = Array.isArray(mat) ? mat : [mat];
      for (const m of mats) {
        if (!m) continue;
        if ('envMapIntensity' in m) m.envMapIntensity = 1.35;
        // Keep the red roof beacon glowing; don't invent emissive elsewhere.
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
    // Normalize easing to 60fps and cap catch-up after the tab was backgrounded.
    const k = Math.min(delta * 60, 3);
    smoothed.current += (progress.current - smoothed.current) * RIDE_EASE * k;
    const t = clamp01(smoothed.current);
    const e = easeInOut(t);

    const { center, size, minY, maxY } = bounds;
    const span = maxY - minY;
    const horiz = Math.max(size.x, size.z);

    // Spiral around the tower's vertical axis.
    const angle = lerp(-0.7, 1.7, t); // ~135 degrees of sweep
    const radius = lerp(horiz * 3.2, horiz * 1.9, e); // pull inward near the top
    const camY = lerp(minY + span * 0.02, maxY - span * 0.05, e); // base -> crown

    camera.position.set(
      center.x + Math.sin(angle) * radius,
      camY,
      center.z + Math.cos(angle) * radius,
    );

    // Look just slightly up the building early, levelling off toward the crown,
    // so the facade always fills the frame as we rise.
    const upOffset = lerp(span * 0.12, span * 0.02, e);
    target.current.set(center.x, camY + upOffset, center.z);
    camera.lookAt(target.current);
  });

  return <primitive object={scene} />;
}

/* Warm golden-hour sky: a vertical gradient baked into a CanvasTexture is used
   both as the scene background (so the climb is wrapped in sky) and, mapped
   equirectangularly through PMREM, as the environment the tower's glass reflects.
   Cool blue zenith → soft haze → warm peach → golden horizon, matched to the
   rest of the site's sunset world. */
function SkyEnvironment() {
  const { scene, gl } = useThree();
  useEffect(() => {
    // Tall gradient strip for the sky dome / background.
    const c = document.createElement('canvas');
    c.width = 16;
    c.height = 512;
    const ctx = c.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, '#243a6b'); // cool upper sky
    g.addColorStop(0.4, '#5d7bb4');
    g.addColorStop(0.66, '#aec2e0');
    g.addColorStop(0.84, '#ffd6a6'); // warm band
    g.addColorStop(1, '#ff9e5a'); // golden horizon
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 16, 512);
    const bgTex = new THREE.CanvasTexture(c);
    bgTex.colorSpace = THREE.SRGBColorSpace;

    // A wider equirect version (same gradient, horizontally tiled) for a smooth
    // environment reflection on the glass.
    const eqCanvas = document.createElement('canvas');
    eqCanvas.width = 512;
    eqCanvas.height = 256;
    const ectx = eqCanvas.getContext('2d')!;
    const eg = ectx.createLinearGradient(0, 0, 0, 256);
    eg.addColorStop(0, '#2a4070');
    eg.addColorStop(0.45, '#6f8cc0');
    eg.addColorStop(0.7, '#cdd9ec');
    eg.addColorStop(0.86, '#ffd6a6');
    eg.addColorStop(1, '#ff9852');
    ectx.fillStyle = eg;
    ectx.fillRect(0, 0, 512, 256);
    // A soft sun bloom on the horizon for a believable hotspot in reflections.
    const sun = ectx.createRadialGradient(360, 210, 0, 360, 210, 150);
    sun.addColorStop(0, 'rgba(255,244,214,0.95)');
    sun.addColorStop(0.4, 'rgba(255,205,140,0.35)');
    sun.addColorStop(1, 'rgba(255,205,140,0)');
    ectx.fillStyle = sun;
    ectx.fillRect(0, 0, 512, 256);
    const eqTex = new THREE.CanvasTexture(eqCanvas);
    eqTex.mapping = THREE.EquirectangularReflectionMapping;
    eqTex.colorSpace = THREE.SRGBColorSpace;

    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromEquirectangular(eqTex).texture;

    const prevBg = scene.background;
    const prevEnv = scene.environment;
    const prevFog = scene.fog;
    scene.background = bgTex;
    scene.environment = env;
    scene.fog = new THREE.Fog(new THREE.Color('#cdb89a').getHex(), 600, 4200);
    gl.toneMappingExposure = 1.04;

    pmrem.dispose();
    eqTex.dispose();

    return () => {
      scene.background = prevBg;
      scene.environment = prevEnv;
      scene.fog = prevFog;
      bgTex.dispose();
      env.dispose();
    };
  }, [scene, gl]);

  return (
    <>
      {/* Warm sun key light raking up the facade from a low golden-hour angle. */}
      <hemisphereLight args={['#bcd4ff', '#5a4636', 0.85]} />
      <directionalLight position={[8, 9, 6]} intensity={2.2} color="#ffdcae" />
      <directionalLight position={[-6, 4, -4]} intensity={0.7} color="#9fb8df" />
      <ambientLight intensity={0.35} />
    </>
  );
}

export default function SkyscraperRide() {
  const progress = useScrollProgress();
  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 60, near: 1, far: 9000 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.04;
        }}
      >
        <Suspense fallback={null}>
          <SkyEnvironment />
          <Tower progress={progress} />
        </Suspense>
      </Canvas>
      <div className={styles.scrim} />
    </div>
  );
}
