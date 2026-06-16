'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from './CoasterRide.module.css';

// 2.6MB Draco-compressed build of the 90MB first-person POV coaster (see
// scripts/optimize_coaster.mjs). It keeps the baked 90s camera animation so we
// can scrub the ride by scroll.
const COASTER_URL = '/coaster_optimized.glb';
const CAMERA_NODE = 'BluffTitler Camera Layer 9_887'; // the animated POV node
const SKY_TOP = '#bcd8f2';
const SKY_BOTTOM = '#f3e6cf';

// Ride pacing (per-frame values are normalized to 60fps in useFrame).
// RIDE_EASE softens the approach to the scroll target; RIDE_MAX_STEP caps how
// much of the ride can advance per frame so even a fast scroll flick stays slow
// and steady (the whole ~90s ride takes at least ~12s of motion to traverse).
const RIDE_EASE = 0.045;
const RIDE_MAX_STEP = 0.0014;

useGLTF.preload(COASTER_URL, true);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Page scroll 0..1 (top..bottom), written into a ref by a passive listener so
   the render loop reads it without re-rendering React. Same pattern the homepage
   SkyWorld uses. */
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

/* The ride. Loads the coaster scene, builds an AnimationMixer over its baked
   clip, and every frame scrubs that clip to (scroll * duration). The clip drives
   both the scene-root node and the camera-layer node (an inverse rig), so reading
   the camera-layer node's WORLD transform and copying it onto the render camera
   gives the exact first-person POV the artist baked — no matter what the rig
   does. Scroll is lerp-smoothed so the ride feels weighty rather than 1:1. */
function CoasterRig({ progress }: { progress: ProgressRef }) {
  const { scene, animations } = useGLTF(COASTER_URL, true);
  const { camera } = useThree();

  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const duration = animations[0]?.duration ?? 1;
  const camNode = useMemo(
    () => scene.getObjectByName(CAMERA_NODE) ?? null,
    [scene],
  );

  useEffect(() => {
    if (!animations[0]) return;
    const action = mixer.clipAction(animations[0]);
    action.play(); // enabled + unpaused so mixer.setTime() can scrub it
    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
    };
  }, [mixer, animations, scene]);

  const smoothed = useRef(0);

  useFrame((_, delta) => {
    // Normalize to 60fps and cap the catch-up after a tab is backgrounded.
    const k = Math.min(delta * 60, 3);
    const diff = progress.current - smoothed.current;
    // Ease toward the scroll target, but never advance the ride faster than
    // RIDE_MAX_STEP/frame — a quick scroll flick still rides slow and steady.
    const eased = diff * RIDE_EASE * k;
    const cap = RIDE_MAX_STEP * k;
    smoothed.current += THREE.MathUtils.clamp(eased, -cap, cap);
    // Hold a hair inside the clip ends so the looped first/last identical frame
    // doesn't snap.
    const t = THREE.MathUtils.clamp(smoothed.current, 0.001, 0.999) * duration;
    mixer.setTime(t);

    if (camNode) {
      // getWorldPosition/Quaternion force an ancestor world-matrix update first,
      // so they reflect the pose we just scrubbed onto the render camera.
      camNode.getWorldPosition(camera.position);
      camNode.getWorldQuaternion(camera.quaternion);
    }
  });

  return <primitive object={scene} />;
}

/* Sky-blue gradient backdrop sphere so there's never a black void behind the
   track, plus light so the (mostly unlit) coaster materials read. */
function Environment() {
  const { scene } = useThree();
  useEffect(() => {
    const top = new THREE.Color(SKY_TOP);
    const bottom = new THREE.Color(SKY_BOTTOM);
    const prevBg = scene.background;
    scene.background = top;
    const fog = new THREE.Fog(bottom.getHex(), 60, 1400);
    scene.fog = fog;
    return () => {
      scene.background = prevBg;
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      <hemisphereLight args={[SKY_TOP, '#6b6357', 1.15]} />
      <directionalLight position={[120, 200, 80]} intensity={2.1} />
      <ambientLight intensity={0.7} />
    </>
  );
}

export default function CoasterRide() {
  const progress = useScrollProgress();
  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 72, near: 0.5, far: 9000 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <Suspense fallback={null}>
          <Environment />
          <CoasterRig progress={progress} />
        </Suspense>
      </Canvas>
      <div className={styles.scrim} />
    </div>
  );
}
