# PNML-Moddle.js Converter

This module provides a parser and serializer for .pnml files and Moddle.js XML files specifying place transition nets. In addition, a converter has been implemented to transform each of the representations into another.

## Installation

Use the following command to add this package as a dependency to your node project.

```bash
npm i --save pnml-moddle-converter
```

## Usage

### Format Conversion

The package can be used as follows (the example can be found in `dev.ts`):

```typescript
import { 
  parseModdleXml, 
  parsePnmlXml, 
  convertModdleToPnml, 
  convertPnmlToModdle,
  convertModdleXmlToPnmlXml,
  convertPnmlXmlToModdleXml,
} from "pnml-moddle-converter";

const moddleXml = '<?xml version="1.0" encoding="UTF-8"?>...';
const pnmlXml = '<?xml version="1.0" encoding="UTF-8"?>...';

// Parse a XML file including a Moddle.js place transition net specification
const moddleDefinitions = parseModdleXml(moddleXml);
// Serialize a ModdleDefinitions object into a string
const moddleXml2 = moddleDefinitions.serialize();
// Convert a ModdleDefinitions object into a PnmlDocument object
const pnmlDocumentFromModdle = convertModdleToPnml(moddleDefinitions);
// Directly convert a Moddle XML to a PNML
const pnmlXmlFromModdleXml = convertModdleXmlToPnmlXml(moddleXml);

// Parse a PNML file specifying a place transition net
const pnmlDocument = parsePnmlXml(pnmlXml);
// Serialize a PnmlDocument object into a string
const pnmlXml2 = pnmlDocument.serialize();
// Convert a PnmlDocument object into a ModdleDefinitions object
const moddleDefinitionsFromPnml = convertPnmlToModdle(pnmlDocument);
// Directly convert a PNML to a Moddle XML
const moddleXmlFromPnmlXml = convertPnmlXmlToModdleXml(pnmlXml);
```

### Model Creation

The library can also be used to create models that can be serialized to the corresponding format.

#### Moddle

Example

```typescript
const places: ModdlePlace[] = [
  new ModdlePlace({ id: 'place_1', name: 'p_1', marking: 2 }),
  new ModdlePlace({ id: 'place_2', name: 'p_2', marking: 0 }),
];
const transitions: ModdleTransition[] = [
  new ModdleTransition({ id: 'transition_1', name: 't_1' }),
];
const arcs: ModdleArc[] = [
  new ModdleArc({ id: 'arc_1', source: 'place_1', target: 'transition_1', weight: 2}),
  new ModdleArc({ id: 'arc_2', source: 'transition_1', target: 'place_2', weight: 1}),
];

const moddle = new ModdleDefinitions({
  ptNet: new ModdlePTNet({
    id: 'ptnet_id_1', 
    name: 'ptnet_name_1', 
    places, 
    transitions, 
    arcs
  })
});

moddle.serialize();
```

#### PNML

Example 

```typescript
const places: PnmlPlace[] = [
  new PnmlPlace({id: "place_1", label: "p_1", initialMarking: 2}),
  new PnmlPlace({id: "place_2", label: "p_2", initialMarking: 0}),
];
const transitions: PnmlTransition[] = [
  new PnmlTransition({id: "transition_1", label: "t_1"}),
];
const arcs: PnmlArc[] = [
  new PnmlArc({id: "arc_1", source: "place_1", target: "transition_1", weight: 2}),
  new PnmlArc({id: "arc_2", source: "transition_1", target: "place_2", weight: 1}),
];

const pnml = new PnmlDocument({
  nets: [
    new PnmlNet({
      id: "net_1",
      name: "net_1",
      type: "http://www.pnml.org/version-2009/grammar/ptnet",
      pages: [
        new PnmlPage({
          id: "page_1",
          places,
          transitions,
          arcs,
        })
      ]
    })
  ]
});

pnml.serialize();
```

## Development

Feel free to contribute to the repository [https://github.com/bptlab/pnml-moddle-converter](https://github.com/bptlab/pnml-moddle-converter).

You can use the file `dev.ts` as a sandbox to develop new features. Use the following command to execute the file:

```
npm run dev
```
