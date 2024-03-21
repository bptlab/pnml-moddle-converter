# PNML-Moddle.js Converter

This module provides a parser and serializer for .pnml files and Moddle.js XML files specifying place transition nets. In addition, a converter has been implemented to transform each of the representations into another.

## Usage

The usage is illustrated in `index.ts`:

```typescript
const moddleXml = '<?xml version="1.0" encoding="UTF-8"?>...';
const pnmlXml = '<?xml version="1.0" encoding="UTF-8"?>...';

// Parse a XML file including a Moddle.js place transition net specification
const moddleDefinitions = parseModdleXml(moddleXml);
// Serialize a ModdleDefinitions object into a string
moddleDefinitions.serialize();
// Convert a ModdleDefinitions object into a PnmlDocument object
convertModdleToPnml(moddleDefinitions);

// Parse a PNML file specifying a place transition net
const pnmlDocument = parsePnmlXml(pnmlXml);
// Serialize a PnmlDocument object into a string
pnmlDocument.serialize();
// Convert a PnmlDocument object into a ModdleDefinitions object
convertPnmlToModdle(pnmlDocument);
```

To run the `index.ts` file, please use one of the following commands:

```bash
npm start
```

```bash
# Enable autorestart after changes
npm run dev
```
