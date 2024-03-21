import fs from 'fs'
import { parseModdleXml } from './parser/moddleParser'
import { parsePnmlXml } from './parser/pnmlParser';
import convertModdleToPnml from './converter/moddleToPnmlConverter';
import convertPnmlToModdle from './converter/pnmlToModdleConverter';

const moddleXml = fs.readFileSync('./resources/moddle/example.xml', 'utf8');
const pnmlXml = fs.readFileSync('./resources/pnml/example.pnml', 'utf8');

// Parse a XML file including a Moddle.js place transition net specification
const moddleDefinitions = parseModdleXml(moddleXml);
// Serialize a ModdleDefinitions object into a string
console.info("\n### Serialized ModdleDefinitions object ###\n");
console.info(moddleDefinitions.serialize());
// Convert a ModdleDefinitions object into a PnmlDocument object
console.info("\n### ModdleDefinitions object converted to a PnmlDocument (serialized) ###\n");
console.info(convertModdleToPnml(moddleDefinitions).serialize());

// Parse a PNML file specifying a place transition net
const pnmlDocument = parsePnmlXml(pnmlXml);
// Serialize a PnmlDocument object into a string
console.info("\n### Serialized PnmlDocument object ###\n");
console.info(pnmlDocument.serialize());
// Convert a PnmlDocument object into a ModdleDefinitions object
console.info("\n### PnmlDocument object converted to a ModdleDefinitions (serialized) ###\n");
console.info(convertPnmlToModdle(pnmlDocument).serialize());
