"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModdleXml = void 0;
const xmlbuilder2_1 = require("xmlbuilder2");
const ModdleDefinitions_1 = require("../moddle/ModdleDefinitions");
function parseModdleXml(xml) {
    const parsedXml = (0, xmlbuilder2_1.create)(xml).end({ format: 'object' })['ptn:definitions'];
    return ModdleDefinitions_1.ModdleDefinitions.parseFromObject(parsedXml);
}
exports.parseModdleXml = parseModdleXml;
//# sourceMappingURL=moddleParser.js.map