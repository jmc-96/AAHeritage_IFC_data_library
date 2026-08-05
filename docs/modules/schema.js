
import { state } from "./state.js";


export function resolvableChildren(node) {
  return (node?.children || []).filter((id) => state.nodeById.has(id));
}

export function buildIndexes() {
  state.nodeById = new Map(state.schema.nodes.map((n) => [n.id, n]));
  state.parentIndex = new Map();

  const dangling = [];

  for (const n of state.schema.nodes) {
    for (const child of n.children || []) {
      if (!state.nodeById.has(child)) dangling.push(`${n.id} → ${child}`);
      if (!state.parentIndex.has(child)) state.parentIndex.set(child, new Set());
      state.parentIndex.get(child).add(n.id);
    }
  }

  for (const r of state.schema.roots || []) {
    if (!state.nodeById.has(r)) dangling.push(`roots → ${r}`);
  }

  if (dangling.length) {
    console.warn(
      `schema.json references ${dangling.length} node(s) that do not exist:\n  ` +
        dangling.join("\n  ")
    );
  }
}

export function findPathFromRoots(targetId) {
  const roots = new Set(state.schema.roots || []);
  if (roots.has(targetId)) return [targetId];

  const queue = [targetId];
  const prev = new Map();
  const visited = new Set([targetId]);

  while (queue.length) {
    const cur = queue.shift();
    const parents = state.parentIndex.get(cur);
    if (!parents) continue;

    for (const p of parents) {
      if (visited.has(p)) continue;
      visited.add(p);
      prev.set(p, cur);

      if (roots.has(p)) {
        const path = [p];
        let step = p;
        while (step !== targetId) {
          const child = prev.get(step);
          if (!child) break;
          path.push(child);
          step = child;
        }
        return path;
      }
      queue.push(p);
    }
  }
  return null;
}
