
import { state } from "./state.js";
import { findPathFromRoots } from "./schema.js";
import { setInspector } from "./inspector.js";
import { renderTree, initTreeExpansion, updateToggleAllBtn } from "./tree.js";

const elSearch = document.getElementById("search");
const elReset = document.getElementById("resetBtn");
const elTreeContent = document.getElementById("treeContent");
const elSearchStatus = document.getElementById("searchStatus");

function setStatus(text) {
  if (elSearchStatus) elSearchStatus.textContent = text;
}

export function setupSearch() {
  elSearch.addEventListener("input", () => {
    const q = (elSearch.value || "").trim();

    if (q.length === 0) {
      state.highlighted = null;
      setStatus("");
      renderTree();
      return;
    }

    // Priority: exact id > case-insensitive exact > prefix > substring
    const exact = state.nodeById.get(q);
    let hit = exact ? exact.id : null;

    if (!hit) {
      const lower = q.toLowerCase();
      const ids = [...state.nodeById.keys()];
      hit =
        ids.find((id) => id.toLowerCase() === lower) ||
        ids.find((id) => id.toLowerCase().startsWith(lower)) ||
        ids.find((id) => (state.nodeById.get(id)?.label || id).toLowerCase().includes(lower)) ||
        null;
    }

    if (!hit) {
      setStatus(`No match. This browser covers ${state.nodeById.size} of the ~800 IFC4X3 classes.`);
      state.highlighted = null;
      renderTree();
      return;
    }

    setStatus("");

    const path = findPathFromRoots(hit);
    if (path) {
      for (const id of path) state.expandedNodes.add(id);
    }
    state.highlighted = hit;
    state.selected = hit;
    setInspector(hit);
    updateToggleAllBtn();
    renderTree();

    requestAnimationFrame(() => {
      const el = elTreeContent.querySelector(".tree-row.highlighted");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  elReset.addEventListener("click", () => {
    elSearch.value = "";
    state.highlighted = null;
    state.selected = null;
    setStatus("");
    setInspector(null);
    initTreeExpansion();
    renderTree();
  });
}
