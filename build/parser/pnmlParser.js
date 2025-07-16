"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePnmlXml = parsePnmlXml;
const xmlbuilder2_1 = require("xmlbuilder2");
const PnmlDocument_1 = require("../pnml/PnmlDocument");
function parsePnmlXml(xml) {
    const parsedXml = (0, xmlbuilder2_1.create)(xml).end({ format: 'object' }).pnml;
    return PnmlDocument_1.PnmlDocument.parseFromObject(parsedXml);
}
