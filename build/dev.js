"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Use this file to test functions and classes under development
// Run `npm run dev` to execute this file
const fs_1 = __importDefault(require("fs"));
const pnmlToModdle_1 = require("./converter/pnmlToModdle");
const moddleParser_1 = require("./parser/moddleParser");
const moddleToPnml_1 = require("./converter/moddleToPnml");
const pnmlParser_1 = require("./parser/pnmlParser");
const moddleXml = fs_1.default.readFileSync("./resources/moddle/example.xml", { encoding: "utf-8" });
const pnmlXml = fs_1.default.readFileSync("./resources/pnml/example.pnml", { encoding: "utf-8" });
// Parse a XML file including a Moddle.js place transition net specification
const moddleDefinitions = (0, moddleParser_1.parseModdleXml)(moddleXml);
// Serialize a ModdleDefinitions object into a string
const moddleXml2 = moddleDefinitions.serialize();
// Convert a ModdleDefinitions object into a PnmlDocument object
const pnmlDocumentFromModdle = (0, moddleToPnml_1.convertModdleToPnml)(moddleDefinitions);
// Directly convert a Moddle XML to a PNML
const pnmlXmlFromModdleXml = (0, moddleToPnml_1.convertModdleXmlToPnmlXml)(moddleXml);
// Parse a PNML file specifying a place transition net
const pnmlDocument = (0, pnmlParser_1.parsePnmlXml)(pnmlXml);
// Serialize a PnmlDocument object into a string
const pnmlXml2 = pnmlDocument.serialize();
// Convert a PnmlDocument object into a ModdleDefinitions object
const moddleDefinitionsFromPnml = (0, pnmlToModdle_1.convertPnmlToModdle)(pnmlDocument);
// Directly convert a PNML to a Moddle XML
const moddleXmlFromPnmlXml = (0, pnmlToModdle_1.convertPnmlXmlToModdleXml)(pnmlXml);
