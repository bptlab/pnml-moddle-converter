# PNML-Moddle.js Converter

This module provides a parser and serializer for .pnml files and Moddle.js XML files specifying place transition nets. In addition, a converter has been implemented to transform each of the representations into another.

## Installation

Use the following command to add this package as a dependency to your node project.

```bash
npm i --save pnml-moddle-converter
```

## Usage

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
const moddleXmlFromPnmlXml = convertPnmlXmlToModdleXml(moddleXml);
```

## Development

Feel free to contribute to the repository [https://github.com/bptlab/pnml-moddle-converter](https://github.com/bptlab/pnml-moddle-converter).

You can use the file `dev.ts` as a sandbox to develop new features. Use the following command to execute the file:

```
npm run dev
```
