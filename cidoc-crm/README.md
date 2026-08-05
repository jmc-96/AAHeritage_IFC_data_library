# `cidoc-crm/` — third-party ontology files

This folder contains the **CIDOC CRM** and **CRMba** RDFS encodings, redistributed here from FORTH-ICS. They are **not** part of the *A²Heritage* library and are **not** covered by this repository's MIT licence — see [Licence and attribution](#licence-and-attribution) below. In the IFC4X3 property sets the mapping is carried in the property name as free text (`Decay (E3 Condition State)`), so these files are the reference for both encodings. Instead, the IFC5 vocabulary in [`propertysets-ifc-5/`](../propertysets-ifc-5/) points at these classes from each schema entry's `uri` field, for example:

```json
"aah::heritage::decay::Decay": {
  "uri": "http://www.cidoc-crm.org/cidoc-crm/E3_Condition_State"
}
```

> CRMba v1.4 is still officially marked **DRAFT** on cidoc-crm.org. There is no `B6` class in the standard, although creators of the extension have published papers in which this and other candidate classes are used. Where the library's property names carry `B6 Function`, that code is retained as published in the source research and has no resolvable ontology URI.

## Files

| File | Model | Version | Released | Official page |
| --- | --- | --- | --- | --- |
| `CIDOC_CRM_v7.1.3.rdf` | CIDOC Conceptual Reference Model | 7.1.3 | February 2024 | [cidoc-crm.org/Version/version-7.1.3](https://cidoc-crm.org/Version/version-7.1.3) |
| `CRMba_v1.4.rdf` | CRMba — *An extension of CIDOC CRM to support buildings archaeology documentation* | 1.4 (DRAFT) | April 2016 | [cidoc-crm.org/crmba/ModelVersion/version-1.4](https://cidoc-crm.org/crmba/ModelVersion/version-1.4) |

Both models are also published by FORTH-ICS on GitLab: [cidoc_crm_rdf](https://gitlab.isl.ics.forth.gr/cidoc-crm/cidoc_crm_rdf) and [compatible-models/crmba](https://gitlab.isl.ics.forth.gr/cidoc-crm/compatible-models/crmba).

## Licence and attribution

Both files are © **FORTH-ICS** and the **CIDOC CRM Special Interest Group**, and are licensed under the
**[Creative Commons Attribution 4.0 International Licence (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)**.

**This licence applies only to the contents of this folder.** The rest of this repository is MIT-licensed — see the root [`LICENSE`](../LICENSE). If you use CIDOC CRM or CRMba in your own work, cite the models themselves rather than this repository. These files are provided as-is, without warranty of any kind, by FORTH-ICS and by this repository alike.
