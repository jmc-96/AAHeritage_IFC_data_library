export const state = {
  schema: null,
  nodeById: new Map(),
  parentIndex: new Map(),
  expandedNodes: new Set(),
  /** ID of the search-highlighted node */
  highlighted: null,
  /** ID of the inspector-selected node */
  selected: null,
};
