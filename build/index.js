"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPnmlXmlToModdleXml = exports.convertPnmlToModdle = exports.convertModdleXmlToPnmlXml = exports.convertModdleToPnml = exports.parsePnmlXml = exports.parseModdleXml = exports.PnmlTransition = exports.PnmlPlace = exports.PnmlPage = exports.PnmlNet = exports.PnmlDocument = exports.PnmlArc = exports.ModdleTransition = exports.ModdlePlace = exports.ModdlePTNet = exports.ModdleDefinitions = exports.ModdleArc = void 0;
// Classes
// Moddle
var ModdleArc_1 = require("./moddle/ModdleArc");
Object.defineProperty(exports, "ModdleArc", { enumerable: true, get: function () { return ModdleArc_1.ModdleArc; } });
var ModdleDefinitions_1 = require("./moddle/ModdleDefinitions");
Object.defineProperty(exports, "ModdleDefinitions", { enumerable: true, get: function () { return ModdleDefinitions_1.ModdleDefinitions; } });
var ModdlePTNet_1 = require("./moddle/ModdlePTNet");
Object.defineProperty(exports, "ModdlePTNet", { enumerable: true, get: function () { return ModdlePTNet_1.ModdlePTNet; } });
var ModdlePlace_1 = require("./moddle/ModdlePlace");
Object.defineProperty(exports, "ModdlePlace", { enumerable: true, get: function () { return ModdlePlace_1.ModdlePlace; } });
var ModdleTransition_1 = require("./moddle/ModdleTransition");
Object.defineProperty(exports, "ModdleTransition", { enumerable: true, get: function () { return ModdleTransition_1.ModdleTransition; } });
// PNML
var PnmlArc_1 = require("./pnml/PnmlArc");
Object.defineProperty(exports, "PnmlArc", { enumerable: true, get: function () { return PnmlArc_1.PnmlArc; } });
var PnmlDocument_1 = require("./pnml/PnmlDocument");
Object.defineProperty(exports, "PnmlDocument", { enumerable: true, get: function () { return PnmlDocument_1.PnmlDocument; } });
var PnmlNet_1 = require("./pnml/PnmlNet");
Object.defineProperty(exports, "PnmlNet", { enumerable: true, get: function () { return PnmlNet_1.PnmlNet; } });
var PnmlPage_1 = require("./pnml/PnmlPage");
Object.defineProperty(exports, "PnmlPage", { enumerable: true, get: function () { return PnmlPage_1.PnmlPage; } });
var PnmlPlace_1 = require("./pnml/PnmlPlace");
Object.defineProperty(exports, "PnmlPlace", { enumerable: true, get: function () { return PnmlPlace_1.PnmlPlace; } });
var PnmlTransition_1 = require("./pnml/PnmlTransition");
Object.defineProperty(exports, "PnmlTransition", { enumerable: true, get: function () { return PnmlTransition_1.PnmlTransition; } });
// Parser
var moddleParser_1 = require("./parser/moddleParser");
Object.defineProperty(exports, "parseModdleXml", { enumerable: true, get: function () { return moddleParser_1.parseModdleXml; } });
var pnmlParser_1 = require("./parser/pnmlParser");
Object.defineProperty(exports, "parsePnmlXml", { enumerable: true, get: function () { return pnmlParser_1.parsePnmlXml; } });
// Converter
var moddleToPnml_1 = require("./converter/moddleToPnml");
Object.defineProperty(exports, "convertModdleToPnml", { enumerable: true, get: function () { return moddleToPnml_1.convertModdleToPnml; } });
Object.defineProperty(exports, "convertModdleXmlToPnmlXml", { enumerable: true, get: function () { return moddleToPnml_1.convertModdleXmlToPnmlXml; } });
var pnmlToModdle_1 = require("./converter/pnmlToModdle");
Object.defineProperty(exports, "convertPnmlToModdle", { enumerable: true, get: function () { return pnmlToModdle_1.convertPnmlToModdle; } });
Object.defineProperty(exports, "convertPnmlXmlToModdleXml", { enumerable: true, get: function () { return pnmlToModdle_1.convertPnmlXmlToModdleXml; } });
//# sourceMappingURL=index.js.map