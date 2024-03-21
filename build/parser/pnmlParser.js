"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePnmlXml = void 0;
const xmlbuilder2_1 = require("xmlbuilder2");
const PnmlDocument_1 = __importDefault(require("../pnml/PnmlDocument"));
function parsePnmlXml(xml) {
    const parsedXml = (0, xmlbuilder2_1.create)(xml).end({ format: 'object' }).pnml;
    return PnmlDocument_1.default.parseFromObject(parsedXml);
}
exports.parsePnmlXml = parsePnmlXml;
//# sourceMappingURL=pnmlParser.js.map