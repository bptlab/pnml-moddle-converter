"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertModdleXmlToPnmlXml = exports.convertModdleToPnml = void 0;
const moddleParser_1 = require("../parser/moddleParser");
const PnmlArc_1 = __importDefault(require("../pnml/PnmlArc"));
const PnmlDocument_1 = __importDefault(require("../pnml/PnmlDocument"));
const PnmlNet_1 = __importStar(require("../pnml/PnmlNet"));
const PnmlPage_1 = __importDefault(require("../pnml/PnmlPage"));
const PnmlPlace_1 = __importDefault(require("../pnml/PnmlPlace"));
const PnmlTransition_1 = __importDefault(require("../pnml/PnmlTransition"));
const initialMarkingOffset = { x: 22, y: 20 };
function convertModdleToPnml(moddleDefinitions) {
    const places = moddleDefinitions.ptNet.places.map((place) => (new PnmlPlace_1.default({
        id: place.id,
        label: place.name,
        initialMarking: place.marking > 0 ? place.marking : undefined,
        nodePosition: place.bounds ? {
            x: place.bounds.x,
            y: place.bounds.y
        } : undefined,
        labelOffset: place.bounds && place.labelBounds ? {
            x: place.bounds.x - place.labelBounds.x,
            y: place.bounds.y - place.labelBounds.y,
        } : undefined,
        initialMarkingOffset: place.marking > 0 ? initialMarkingOffset : undefined
    })));
    const transitions = moddleDefinitions.ptNet.transitions.map((transition) => (new PnmlTransition_1.default({
        id: transition.id,
        label: transition.name,
        nodePosition: transition.bounds ? {
            x: transition.bounds.x,
            y: transition.bounds.y
        } : undefined,
        labelOffset: transition.bounds && transition.labelBounds ? {
            x: transition.bounds.x - transition.labelBounds.x,
            y: transition.bounds.y - transition.labelBounds.y,
        } : undefined,
    })));
    const arcs = moddleDefinitions.ptNet.arcs.map((arc) => (new PnmlArc_1.default({
        id: arc.id,
        source: arc.source,
        target: arc.target,
        weight: arc.weight,
    })));
    const page = new PnmlPage_1.default({
        id: 'ptnet_page_1',
        places,
        transitions,
        arcs
    });
    const net = new PnmlNet_1.default({
        id: moddleDefinitions.ptNet.id,
        name: moddleDefinitions.ptNet.name,
        type: PnmlNet_1.PnmlNetType.PtNet,
        pages: [page],
    });
    const pnmlDocument = new PnmlDocument_1.default({
        nets: [net]
    });
    return pnmlDocument;
}
exports.convertModdleToPnml = convertModdleToPnml;
function convertModdleXmlToPnmlXml(moddleXml) {
    const moddleDefinitions = (0, moddleParser_1.parseModdleXml)(moddleXml);
    return convertModdleToPnml(moddleDefinitions).serialize();
}
exports.convertModdleXmlToPnmlXml = convertModdleXmlToPnmlXml;
//# sourceMappingURL=moddleToPnml.js.map