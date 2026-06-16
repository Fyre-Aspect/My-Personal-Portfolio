// Optimize the 90MB first-person POV roller-coaster GLB into a web-usable asset.
//
// The GLB is a Sketchfab/BluffTitler export: 2154 meshes, ~2.4M triangles, and a
// baked 90s first-person camera animation (node "BluffTitler Camera Layer 9_887"
// rides the track; the scene-root node counter-animates — the classic rig). We
// KEEP the hierarchy + animation intact so the app can scrub that baked camera
// path by scroll, and only shrink size/geometry: dedup, weld, simplify, resample
// (compress the 1801-key animation), prune, then Draco-compress.
//
//   node scripts/optimize_coaster.mjs [ratio] [error]
//
// Defaults: ratio 0.6 (keep 60% of triangles), error 0.004 (conservative).
import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import { dedup, prune, weld, simplify, resample } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import draco3d from 'draco3dgltf';

const INPUT = 'public/1st_person_pov_roller_coaster.glb';
const OUTPUT = 'public/coaster_optimized.glb';
const ratio = Number(process.argv[2] ?? 0.6);
const error = Number(process.argv[3] ?? 0.004);

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression])
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });

console.log(`Reading ${INPUT} ...`);
const doc = await io.read(INPUT);
await MeshoptSimplifier.ready;

const root = doc.getRoot();
const beforeMeshes = root.listMeshes().length;
const beforeAnims = root.listAnimations().length;
console.log(`Before: ${beforeMeshes} meshes, ${beforeAnims} animations`);

console.log('Transforming (dedup, weld, simplify, resample, prune) ...');
await doc.transform(
  dedup(),
  // weld merges identical vertices so simplify has a connected mesh to work on.
  weld(),
  // Decimate triangles. lockBorder protects open edges (the thin rails / track
  // profile) from collapsing into spikes. error is in scene units.
  simplify({ simplifier: MeshoptSimplifier, ratio, error, lockBorder: true }),
  // Drop redundant keyframes from the 1801-key linear animation.
  resample(),
  // Remove anything now unused; keep nodes referenced by the camera animation.
  prune({ keepLeaves: false, keepAttributes: false }),
);

// Draco-compress every primitive. drei's useGLTF(url, true) decodes this with the
// hosted Draco decoder, so no extra wiring is needed in the app.
doc
  .createExtension(KHRDracoMeshCompression)
  .setRequired(true)
  .setEncoderOptions({
    method: KHRDracoMeshCompression.EncoderMethod.EDGEBREAKER,
    encodeSpeed: 5,
    decodeSpeed: 5,
  });

console.log('Writing Draco-compressed GLB ...');
await io.write(OUTPUT, doc);

const root2 = doc.getRoot();
console.log(`After: ${root2.listMeshes().length} meshes, ${root2.listAnimations().length} animations`);
console.log(`Done -> ${OUTPUT}`);
