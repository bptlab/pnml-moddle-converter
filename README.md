# PNML-Moddle.js Converter

This module provides a parser and serializer for .pnml files and Moddle.js XML files specifying place transition nets. In addition, a converter has been implemented to transform each of the representations into another.

## Usage

```typescript
import { 
  parseModdleXml, 
  parsePnmlXml, 
  convertModdleToPnml, 
  convertPnmlToModdle,
} from "pnml-moddle-converter";

const moddleXml = '<?xml version="1.0" encoding="UTF-8"?>...';
const pnmlXml = '<?xml version="1.0" encoding="UTF-8"?>...';

// Parse a XML file including a Moddle.js place transition net specification
const moddleDefinitions = parseModdleXml(moddleXml);
// Serialize a ModdleDefinitions object into a string
moddleDefinitions.serialize();
// Convert a ModdleDefinitions object into a PnmlDocument object
convertModdleToPnml(moddleDefinitions);
// Directly convert a Moddle XML to a PNML
convertModdleXmlToPnmlXml(moddleXml);

// Parse a PNML file specifying a place transition net
const pnmlDocument = parsePnmlXml(pnmlXml);
// Serialize a PnmlDocument object into a string
pnmlDocument.serialize();
// Convert a PnmlDocument object into a ModdleDefinitions object
convertPnmlToModdle(pnmlDocument);
// Directly convert a PNML to a Moddle XML
convertPnmlXmlToModdleXml(moddleXml);
```
