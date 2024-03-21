"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModdleXml = void 0;
const xmlbuilder2_1 = require("xmlbuilder2");
const ModdleDefinitions_1 = __importDefault(require("../moddle/ModdleDefinitions"));
function parseModdleXml(xml) {
    const parsedXml = (0, xmlbuilder2_1.create)(xml).end({ format: 'object' })['ptn:definitions'];
    return ModdleDefinitions_1.default.parseFromObject(parsedXml);
}
exports.parseModdleXml = parseModdleXml;
//# sourceMappingURL=moddleParser.js.map