# IFC Metadata Schema Browser

> This tool **was not part of the research** described in the publications listed in the [root README](../README.md). It is provided for experiments and future extensions of the library.

The IFC Metadata Schema Browser is a small static web tool for reading the subset of **IFC4X3_ADD2** that the *A²Heritage* library uses. It renders the class hierarchy as an expandable tree, lets you search for a class, and shows for each one a short plain-language summary plus a link to its official buildingSMART documentation page.

It covers ~50 classes — only those the library actually touches — rather than the full schema. The point is to make the slice of IFC relevant to heritage modelling readable in one screen, not to replace the official documentation.

## Running it

```bash
cd docs
npm install
npm run dev
```

## Files

| Path | Role |
| --- | --- |
| `index.html` | Page shell: top bar, search input, tree container, inspector panels |
| `main.js` | Entry point — fetches `schema.json`, builds indexes, wires up the UI |
| `schema.json` | The data: schema metadata plus one node per IFC class |
| `styles.css` | All styling |
| `modules/state.js` | Shared mutable state (loaded schema, indexes, expanded/selected/highlighted nodes) |
| `modules/schema.js` | Builds the id and parent indexes, resolves root-to-class paths, warns on dangling references |
| `modules/tree.js` | Renders the class tree and handles expansion |
| `modules/search.js` | Class search and highlighting |
| `modules/inspector.js` | The metadata and schema-info side panels |

## Attribution and third-party material

The IFC class names, the supertype/subtype relationships between them, the abstract/concrete markings and the documentation links in `schema.json` derive from the **buildingSMART IFC4X3_ADD2** specification, © buildingSMART International Ltd. The IFC specification is published under [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/); see [buildingSMART/IFC4.3.x-development](https://github.com/buildingSMART/IFC4.3.x-development).

**No buildingSMART documentation text is reproduced here.** Every `description` field in `schema.json` is an original summary written for this library, several of them referring to CIDOC-CRM mappings that appear nowhere in the IFC documentation. What is taken from buildingSMART is factual information about a published ISO standard — the names of its classes and how they relate — together with deep links back to the authoritative pages. For the normative definitions, follow those links.

`IFC™`, `buildingSMART®` and `openBIM®` are trademarks of buildingSMART International Ltd. This tool is an independent work; it is not affiliated with, endorsed by, or approved by buildingSMART International.

## Licence

The browser — HTML, CSS, JavaScript and the `schema.json` compilation — is released under the MIT Licence, along with the rest of this repository. See the root [`LICENSE`](../LICENSE).
