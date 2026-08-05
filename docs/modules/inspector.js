import { state } from "./state.js";
import { resolvableChildren } from "./schema.js";
import { escapeHtml } from "./utils.js";

const elInspector = document.getElementById("inspectorContent");
const elSchemaInfo = document.getElementById("schemaInfo");

function nodeKindChip(kind) {
  return `<span class="kchip">${escapeHtml(kind || "entity")}</span>`;
}

function safeDocUrl(url) {
  if (!url) return null;
  try {
    return new URL(url, document.baseURI).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function setInspector(nodeId) {
  if (!nodeId) {
    elInspector.innerHTML = `<div class="muted">Click a class to see metadata.</div>`;
    return;
  }
  const n = state.nodeById.get(nodeId);
  if (!n) return;

  const childCount = resolvableChildren(n).length;
  const parents = state.parentIndex.get(nodeId);
  const parentLabel =
    parents && parents.size
      ? [...parents].map((p) => escapeHtml(state.nodeById.get(p)?.label || p)).join(", ")
      : "—";

  const desc = n.description
    ? `<div class="inspector-section">${escapeHtml(n.description)}</div>`
    : "";
  const docUrl = safeDocUrl(n.url);
  const link = docUrl
    ? `<div class="inspector-section"><a href="${escapeHtml(docUrl)}" target="_blank" rel="noopener noreferrer" class="doc-link">📖 View official buildingSMART documentation ↗</a></div>`
    : "";
  const raw = `<div class="pre">${escapeHtml(JSON.stringify(n, null, 2))}</div>`;

  elInspector.innerHTML = `
    <div class="inspector-header">
      <span class="inspector-title">${escapeHtml(n.label || n.id)}</span>
      ${nodeKindChip(n.kind)}
      <span class="badge">${childCount} child${childCount === 1 ? "" : "ren"}</span>
    </div>
    <div class="inspector-parent muted">Parent: ${parentLabel}</div>
    ${desc}
    ${link}
    ${raw}
  `;
}

export function renderSchemaInfo() {
  const m = state.schema.meta || {};
  elSchemaInfo.innerHTML = `
    <div><b>Name:</b> ${escapeHtml(m.name || "-")}</div>
    <div><b>Schema:</b> ${escapeHtml(m.schema || "-")}</div>
    <div><b>Version:</b> ${escapeHtml(m.version || "-")}</div>
  `;
}
