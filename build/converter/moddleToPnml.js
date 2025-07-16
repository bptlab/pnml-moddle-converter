"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertModdleToPnml = convertModdleToPnml;
exports.convertModdleXmlToPnmlXml = convertModdleXmlToPnmlXml;
const moddleParser_1 = require("../parser/moddleParser");
const PnmlArc_1 = require("../pnml/PnmlArc");
const PnmlDocument_1 = require("../pnml/PnmlDocument");
const PnmlNet_1 = require("../pnml/PnmlNet");
const PnmlPage_1 = require("../pnml/PnmlPage");
const PnmlPlace_1 = require("../pnml/PnmlPlace");
const PnmlTransition_1 = require("../pnml/PnmlTransition");
const initialMarkingOffset = { x: 22, y: 20 };
function convertModdleToPnml(moddleDefinitions) {
    var _a, _b;
    const places = moddleDefinitions.model.places.map((place) => new PnmlPlace_1.PnmlPlace({
        id: place.id,
        label: place.name,
        initialMarking: place.marking > 0 ? place.marking : undefined,
        nodePosition: place.bounds
            ? {
                x: place.bounds.x,
                y: place.bounds.y,
            }
            : undefined,
        labelOffset: place.bounds && place.labelBounds
            ? {
                x: place.bounds.x - place.labelBounds.x,
                y: place.bounds.y - place.labelBounds.y,
            }
            : undefined,
        initialMarkingOffset: place.marking > 0 ? initialMarkingOffset : undefined,
    }));
    const transitions = moddleDefinitions.model.transitions.map((transition) => new PnmlTransition_1.PnmlTransition({
        id: transition.id,
        label: transition.name,
        nodePosition: transition.bounds
            ? {
                x: transition.bounds.x,
                y: transition.bounds.y,
            }
            : undefined,
        labelOffset: transition.bounds && transition.labelBounds
            ? {
                x: transition.bounds.x - transition.labelBounds.x,
                y: transition.bounds.y - transition.labelBounds.y,
            }
            : undefined,
    }));
    const arcs = moddleDefinitions.model.arcs.map((arc) => new PnmlArc_1.PnmlArc({
        id: arc.id,
        source: arc.source,
        target: arc.target,
        inscription: arc.inscription,
    }));
    const page = new PnmlPage_1.PnmlPage({
        id: `${(_a = moddleDefinitions.model.id) !== null && _a !== void 0 ? _a : "model"}_page_1`,
        places,
        transitions,
        arcs,
    });
    const net = new PnmlNet_1.PnmlNet({
        id: (_b = moddleDefinitions.model.id) !== null && _b !== void 0 ? _b : "model_id_1",
        name: moddleDefinitions.model.name,
        type: PnmlNet_1.PnmlNetType.PtNet,
        pages: [page],
    });
    const pnmlDocument = new PnmlDocument_1.PnmlDocument({
        nets: [net],
    });
    return pnmlDocument;
}
function convertModdleXmlToPnmlXml(moddleXml) {
    const moddleDefinitions = (0, moddleParser_1.parseModdleXml)(moddleXml);
    return convertModdleToPnml(moddleDefinitions).serialize();
}
