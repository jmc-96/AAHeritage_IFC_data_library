# *A²Heritage* IFC data library

The *A²Heritage* data library uses the IFC 4X3_ADD2 schema and supports openBIM and open-source frameworks in cultural heritage. Due to the lack of standards for **Heritage Building Information Modeling (HBIM)**, *A²Heritage* is intended to be used and extended by all BIM users and cultural heritage experts.

Concepts from the **[CIDOC-CRM](https://www.cidoc-crm.org/)** ontology and its **[CRMba](https://cidoc-crm.org/crmba/ModelVersion/version-1.4)** extension are mapped into the (i) IFC schema and the (ii) customized IfcPropertySetTemplate included in the library.

## **Repository contents**

| Path | Contents |
| --- | --- |
| `propertysets-ifc-4x3/` | 4 files, 12 property set templates, 68 properties (IFC4X3_ADD2) |
| `data/project-template-IFC-4X3-AAH.ifc` | Project template with heritage object types, materials and classification |
| `cidoc-crm/` | CIDOC CRM v7.1.3 and CRMba v1.4 RDFS — see [`cidoc-crm/README.md`](cidoc-crm/README.md) |
| `propertysets-ifc-5/` | The same vocabulary expressed for IFC5 |
| `data/project-template-IFC-5-AAH.ifcx` | IFC5 project template |
| `docs/` | IFC schema browser |

The property set templates are grouped by analysis domain:

| File | Properties | Description |
| --- | --- | --- |
| `B_Element_v01_(E31Document).ifc` | 23 | Tailored properties within the Getty Thesaurus and vocabularies (AAT) are used to semantically represent built elements. |
| `Decay_Analysis_v01_(E31Document).ifc` | 10 | The **IfcSurfaceFeature** class is used to represent decay-analyzed surfaces. This can be enriched, for example, by the PropertySet template **“Decay – Report (E73 Information Object)”**. |
| `FM_v01_(E31Document).ifc` | 11 | Different types of interventions (4D) are considered. Datasheets include fields such as facility name, discipline, inspection item, inspection method, inspection cycle, and more. |
| `HBuilding_v01_(E31Document).ifc` | 24 | Material consistency, data sheet, and historical analysis are used to analyze historical buildings. |

## **Ontology basis**

The **CIDOC Conceptual Reference Model (CRM)** is the formal ontology for cultural heritage information maintained by the CIDOC CRM Special Interest Group and standardised as [ISO 21127:2023](https://www.iso.org/standard/85100.html). **[CRMba](https://cidoc-crm.org/crmba/ModelVersion/version-1.4)** extends it for buildings archaeology, modelling a standing building as a set of morphological and stratigraphic units.

The library maps its properties onto these classes so that heritage data authored in IFC stays semantically interoperable with the museum, archive and archaeology systems already built on CIDOC-CRM. In the IFC4X3 files the mapping is carried in the property name, while the IFC5 vocabulary records it as a machine-readable `uri`.

The RDFS files for both models are redistributed in [`cidoc-crm/`](cidoc-crm/). See [`cidoc-crm/README.md`](cidoc-crm/README.md) for provenance, versions and licensing.

## **Getting started**

The library is a set of IFC property set templates. There is no build step and nothing to install.

1. Open your authoring tool (the library is developed with [Bonsai](https://bonsaibim.org/) / Blender, and the files are plain IFC, so any IFC-capable tool applies).
2. Import `data/project-template-IFC-4X3-AAH.ifc` to start from the heritage project template, which already contains the tailored object types (`IfcSlabType`, `IfcSpaceType`, `IfcWallType`, …), the material palette and the MIDAS Heritage classification.
3. Import the property set templates you need from `propertysets-ifc-4x3/`. Each file is a standalone collection of `IfcPropertySetTemplate` entities and can be imported independently.
4. Assign a class to an object or object type and add to it a property set. The `applicableEntity` attribute of each set records where it is intended to be used — for example `Decay - Report` applies to `IfcSurfaceFeature` and `IfcSpace`.

## **Related publications**

- Muñoz-Cádiz, J., Mariotti, C., Nespeca, R., and Bolognese, L. (2025). [A methodology for integrating the CIDOC-CRMba ontology into the IFC schema to support spatial analysis in archaeological heritage](https://doi.org/10.1016/j.daach.2025.e00431). *Digital Applications in Archaeology and Cultural Heritage*, 37, e00431.

- Muñoz-Cádiz, J., Quattrini, R., and Martín-Talaverano, R. (2024). [Scan-to-MesHBIM: Implementing knowledge about historical vaulted ceilings with open tools](https://doi.org/10.30682/tema100015). *TEMA: Technologies Engineering Materials Architecture*, 10(2), 72–83.

- Clini, P., Mariotti, C., Angeloni, R., and Muñoz Cádiz, J. (2024). [Architectural heritage digital representations for conservation strategies](https://doi.org/10.5194/isprs-archives-XLVIII-2-W4-2024-111-2024). *The International Archives of the Photogrammetry, Remote Sensing and Spatial Information Sciences*, XLVIII-2/W4-2024, 111–118.

- Muñoz-Cádiz, J., Quattrini, R., and Martín-Talaverano, R. (2025). [AI-Driven Analysis in Point Clouds for Archaeological Documentation](https://doi.org/10.1007/978-3-031-93753-8_6). In M. Ioannides, G. Issini, and D. Oliveira (eds.), *3D Research Challenges in Cultural Heritage IV*, Lecture Notes in Computer Science, vol. 13577, pp. 83–96. Springer.

## **Extended material**

> The following **was not part of the research** described in the publications above. It is provided for experiments and future extensions of the library.

### IFC5 experiment

**IFC5 is a pre-release specification.** Files in this repo related to IFC5 target the `ifcx_alpha` format defined by [buildingSMART/IFC5-development](https://github.com/buildingSMART/IFC5-development). IFC5 replaces the property set template mechanism with **namespaced attributes declared in a `schemas` block**, following the pattern buildingSMART uses for its own `bsi::ifc-mat::` material library. All 68 properties become entries under the `aah::heritage::` namespace, with the property set name as a namespace segment:

```text
aah::heritage::decay::Decay
aah::heritage::vaultnet::Style
```

One thing improves on the IFC4X3 version: the ontology mapping becomes **machine-readable**, carried in the schema entry's `uri` rather than embedded in the property name as free text.

```json
"aah::heritage::decay::Decay": {
  "uri": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State",
  "value": { "dataType": "Enum", "enumRestrictions": { "options": ["…"] } }
}
```

33 of the 68 properties currently carry such a mapping — the same coverage as the published files, since the CIDOC entities have not yet been extended to the architectural analysis.

**Caveats:**

- **Three IFC4X3 concepts have no IFC5 equivalent** and are documented rather than encoded: `applicableEntity`, the property set template types (`PSET_TYPEDRIVENONLY` and friends), and the property set as a first-class object. Consult the IFC4X3 files for those.
- **`IfcPerson` and `IfcActor` are omitted** from the IFC5 project template pending actor support in the specification. They remain in the IFC4X3 template.
- **`B6 Function`** has no ontology URI: CRMba v1.4 defines classes B1–B5 only. The code is retained in the property name as published.

### IFC schema browser — `docs/`

A small static tool for reading the subset of IFC4X3 that this library uses, showing the class hierarchy and linking each class to its official buildingSMART documentation.

➔ See [`docs/README.md`](docs/README.md) for how to run it, the file layout, and how to extend `schema.json`.

## **License**

This repository is released under the [MIT License](LICENSE). That covers everything produced for the *A²Heritage* library — the property set templates in `propertysets-ifc-4x3/` and `propertysets-ifc-5/`, the project templates in `data/`, and the schema browser code in `docs/`.

**`cidoc-crm/` is third-party material and is not covered by the MIT License.** It holds the CIDOC CRM v7.1.3 and CRMba v1.4 RDFS encodings, © FORTH-ICS and the CIDOC CRM Special Interest Group, redistributed under the [Creative Commons Attribution 4.0 International Licence (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). Their content is redistributed unchanged; see [`cidoc-crm/README.md`](cidoc-crm/README.md) for full attribution, sources, and the record of modifications required by CC BY.

**IFC** is a standard of buildingSMART International Ltd., whose specification and documentation are published under [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/). This repository reproduces no buildingSMART documentation text: the IFC files here are data authored in an open standard format, and the class summaries in `docs/schema.json` are original. `IFC™`, `buildingSMART®` and `openBIM®` are trademarks of buildingSMART International Ltd.; this library is an independent work, not affiliated with or endorsed by buildingSMART International.

## **Contributing**

🚨 The library is under construction! Several areas are still preliminary or incomplete, and require further work and collaboration with other experts and BIM users. For these reasons, **we ask you to lend a hand in constructing the first open-source and native IFC data library for HBIM projects**.

Contributions are welcome as issues or pull requests. If you extend the property sets, please keep the IFC4X3 files as the source of record since the IFC5 vocabulary is generated from them.
