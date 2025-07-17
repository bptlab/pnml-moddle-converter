// Use this file to test functions and classes under development
// Run `npm run dev` to execute this file
import fs from "fs";

import {
  convertPnmlToModdle,
  convertPnmlXmlToModdleXml,
} from "./converter/pnmlToModdle";
import { parseModdleXml } from "./parser/moddleParser";
import {
  convertModdleToPnml,
  convertModdleXmlToPnmlXml,
} from "./converter/moddleToPnml";
import { parsePnmlXml } from "./parser/pnmlParser";

const moddleXml = fs.readFileSync("./resources/moddle/example.xml", {
  encoding: "utf-8",
});
const pnmlXml = fs.readFileSync("./resources/pnml/example.pnml", {
  encoding: "utf-8",
});

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
