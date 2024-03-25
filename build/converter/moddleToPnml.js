"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertModdleXmlToPnmlXml = exports.convertModdleToPnml = void 0;
const moddleParser_1 = require("../parser/moddleParser");
const PnmlArc_1 = require("../pnml/PnmlArc");
const PnmlDocument_1 = require("../pnml/PnmlDocument");
const PnmlNet_1 = require("../pnml/PnmlNet");
const PnmlPage_1 = require("../pnml/PnmlPage");
const PnmlPlace_1 = require("../pnml/PnmlPlace");
const PnmlTransition_1 = require("../pnml/PnmlTransition");
const initialMarkingOffset = { x: 22, y: 20 };
function convertModdleToPnml(moddleDefinitions) {
    const places = moddleDefinitions.ptNet.places.map((place) => (new PnmlPlace_1.PnmlPlace({
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
    const transitions = moddleDefinitions.ptNet.transitions.map((transition) => (new PnmlTransition_1.PnmlTransition({
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
    const arcs = moddleDefinitions.ptNet.arcs.map((arc) => (new PnmlArc_1.PnmlArc({
        id: arc.id,
        source: arc.source,
        target: arc.target,
        weight: arc.weight,
    })));
    const page = new PnmlPage_1.PnmlPage({
        id: 'ptnet_page_1',
        places,
        transitions,
        arcs
    });
    const net = new PnmlNet_1.PnmlNet({
        id: moddleDefinitions.ptNet.id,
        name: moddleDefinitions.ptNet.name,
        type: PnmlNet_1.PnmlNetType.PtNet,
        pages: [page],
    });
    const pnmlDocument = new PnmlDocument_1.PnmlDocument({
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