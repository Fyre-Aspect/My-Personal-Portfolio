// Tiny coordinator so arrow keys drive exactly one grid at a time.
// The first grid mounted on a page claims control (so arrows work immediately
// on load); hovering or focusing another grid hands control over to it.

let current: symbol | null = null;

export function claimIfNone(id: symbol) {
  if (current === null) current = id;
}

export function engage(id: symbol) {
  current = id;
}

export function isEngaged(id: symbol) {
  return current === id;
}

export function release(id: symbol) {
  if (current === id) current = null;
}
