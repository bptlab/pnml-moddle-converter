"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPnmlXmlToModdleXml = exports.convertPnmlToModdle = exports.convertModdleXmlToPnmlXml = exports.convertModdleToPnml = exports.parsePnmlXml = exports.parseModdleXml = void 0;
var moddleParser_1 = require("./parser/moddleParser");
Object.defineProperty(exports, "parseModdleXml", { enumerable: true, get: function () { return moddleParser_1.parseModdleXml; } });
var pnmlParser_1 = require("./parser/pnmlParser");
Object.defineProperty(exports, "parsePnmlXml", { enumerable: true, get: function () { return pnmlParser_1.parsePnmlXml; } });
var moddleToPnml_1 = require("./converter/moddleToPnml");
Object.defineProperty(exports, "convertModdleToPnml", { enumerable: true, get: function () { return moddleToPnml_1.convertModdleToPnml; } });
Object.defineProperty(exports, "convertModdleXmlToPnmlXml", { enumerable: true, get: function () { return moddleToPnml_1.convertModdleXmlToPnmlXml; } });
var pnmlToModdle_1 = require("./converter/pnmlToModdle");
Object.defineProperty(exports, "convertPnmlToModdle", { enumerable: true, get: function () { return pnmlToModdle_1.convertPnmlToModdle; } });
Object.defineProperty(exports, "convertPnmlXmlToModdleXml", { enumerable: true, get: function () { return pnmlToModdle_1.convertPnmlXmlToModdleXml; } });
const fs_1 = __importDefault(require("fs"));
const moddleToPnml_2 = require("./converter/moddleToPnml");
const pnmlXml = fs_1.default.readFileSync('./resources/moddle/example.xml', 'utf8');
console.info((0, moddleToPnml_2.convertModdleXmlToPnmlXml)(pnmlXml));
//# sourceMappingURL=index.js.map