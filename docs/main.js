import { state } from "./modules/state.js";
import { buildIndexes } from "./modules/schema.js";
import { renderSchemaInfo } from "./modules/inspector.js";
import { setupSearch } from "./modules/search.js";
import { renderTree, initTree, initTreeExpansion } from "./modules/tree.js";

async function main() {
  const res = await fetch("schema.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} – failed to load schema.json`);
  state.schema = await res.json();

  buildIndexes();
  renderSchemaInfo();
  setupSearch();

  initTree();          // wire delegated listeners — called exactly once
  initTreeExpansion();
  renderTree();
}

main().catch((err) => {
  console.error(err);
  const el = document.getElementById("treeContent");
  if (el) {
    el.innerHTML = `<div class="load-error muted">Failed to load schema.json. Make sure you are running a local server (not file://).</div>`;
  }
});
