// Quick structural inspection of the cyberpunk skyscraper GLB so we can decide
// how to drive a scroll camera up it: meshes, animations, cameras, node names,
// and the overall bounding box (height of the building in scene units).
import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';

const INPUT = process.argv[2] ?? 'public/cyberpunk_skyscraper.glb';

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression])
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
  });

const doc = await io.read(INPUT);
const root = doc.getRoot();

const meshes = root.listMeshes();
const anims = root.listAnimations();
const cams = root.listCameras();
const nodes = root.listNodes();

let tris = 0;
for (const m of meshes) {
  for (const p of m.listPrimitives()) {
    const idx = p.getIndices();
    const pos = p.getAttribute('POSITION');
    tris += idx ? idx.getCount() / 3 : (pos ? pos.getCount() / 3 : 0);
  }
}

console.log(`File: ${INPUT}`);
console.log(`Meshes: ${meshes.length}  Nodes: ${nodes.length}  Tris: ~${Math.round(tris)}`);
console.log(`Cameras: ${cams.length}`);
console.log(`Animations: ${anims.length}`);
for (const a of anims) {
  const chans = a.listChannels();
  let maxT = 0;
  for (const s of a.listSamplers()) {
    const input = s.getInput();
    if (input) {
      const arr = input.getArray();
      if (arr && arr.length) maxT = Math.max(maxT, arr[arr.length - 1]);
    }
  }
  console.log(`  anim "${a.getName()}": ${chans.length} channels, ~${maxT.toFixed(2)}s`);
}

// World-space bounding box over all mesh nodes.
const box = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
function mul(m, v) {
  return [
    m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12],
    m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13],
    m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14],
  ];
}
for (const n of nodes) {
  const mesh = n.getMesh();
  if (!mesh) continue;
  const wm = n.getWorldMatrix();
  for (const p of mesh.listPrimitives()) {
    const pos = p.getAttribute('POSITION');
    if (!pos) continue;
    const mn = pos.getMin([]);
    const mx = pos.getMax([]);
    // 8 corners of the local AABB through the world matrix.
    for (const x of [mn[0], mx[0]]) for (const y of [mn[1], mx[1]]) for (const z of [mn[2], mx[2]]) {
      const w = mul(wm, [x, y, z]);
      for (let i = 0; i < 3; i++) {
        box.min[i] = Math.min(box.min[i], w[i]);
        box.max[i] = Math.max(box.max[i], w[i]);
      }
    }
  }
}
console.log('World bounding box:');
console.log('  min', box.min.map((v) => v.toFixed(1)));
console.log('  max', box.max.map((v) => v.toFixed(1)));
console.log('  size', box.max.map((v, i) => (v - box.min[i]).toFixed(1)));

console.log('\nTop-level node names:');
for (const n of root.listScenes()[0].listChildren()) {
  console.log('  -', JSON.stringify(n.getName()));
}
console.log('\nFirst 40 node names:');
nodes.slice(0, 40).forEach((n, i) => console.log(`  ${i}`, JSON.stringify(n.getName())));
