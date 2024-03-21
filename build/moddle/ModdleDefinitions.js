"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serializable_1 = __importDefault(require("../helper/Serializable"));
const ModdlePTNet_1 = __importDefault(require("./ModdlePTNet"));
class ModdleDefinitions extends Serializable_1.default {
    constructor(data) {
        super();
        const { ptNet } = data;
        this.ptNet = ptNet;
        this.children = [ptNet];
    }
    getDataForSerialization() {
        const definitions = {
            "@xmlns:ptn": "http://bpt-lab.org/schemas/ptn",
            "@xmlns:ptnDi": "http://bpt-lab.org/schemas/ptnDi",
            "@xmlns:dc": "https://www.omg.org/spec/BPMN/20100501/DC.xsd",
        };
        return { "ptn:definitions": definitions };
    }
    /**
     * Definitions specifies the elements as well as graphical information of the model.
     * Since the graphical information is stored in the children of the PTNet, this method
     * is overwritten to append the graphical information to the XMLBuilder.
     * @returns XMLBuilder with diagram data
     */
    toXmlBuilder() {
        const xmlBuilder = super.toXmlBuilder();
        const diagram = {
            "@id": `${this.ptNet.id}_di`,
            "ptnDi:ptnPlane": {
                "@id": `${this.ptNet.id}_plane`,
                "@ptNet": this.ptNet.id,
                "ptnDi:ptnShape": [
                    ...this.ptNet.places.map(place => place.getDiagramDataForSerialization()),
                    ...this.ptNet.transitions.map(transition => transition.getDiagramDataForSerialization()),
                ],
                "ptnDi:ptnEdge": this.ptNet.arcs.map(arc => arc.getDiagramDataForSerialization()),
            }
        };
        const diagramBuilder = this.getXmlBuilder({ "ptnDi:ptnDiagram": diagram });
        xmlBuilder.import(diagramBuilder);
        return xmlBuilder;
    }
    static parseFromObject(element) {
        var _a, _b;
        const ptNet = element["ptn:ptNet"];
        if (!ptNet)
            throw new Error("No PTNet found in Definitions");
        const definitions = new ModdleDefinitions({ ptNet: ModdlePTNet_1.default.parseFromObject(ptNet) });
        const diagram = element["ptnDi:ptnDiagram"];
        if (diagram && diagram["ptnDi:ptnPlane"]) {
            const plane = diagram["ptnDi:ptnPlane"];
            let shapes = (_a = plane["ptnDi:ptnShape"]) !== null && _a !== void 0 ? _a : [];
            if (!Array.isArray(shapes)) {
                shapes = [shapes];
            }
            const shapeArray = shapes;
            let edge = (_b = plane["ptnDi:ptnEdge"]) !== null && _b !== void 0 ? _b : [];
            if (!Array.isArray(edge)) {
                edge = [edge];
            }
            const edgeArray = edge;
            const { places, transitions, arcs } = definitions.ptNet;
            places.forEach(place => {
                const shape = shapeArray.find((shape) => shape["@ptnElement"] === place.id);
                if (shape) {
                    place.parseFromShape(shape);
                }
            });
            transitions.forEach(transition => {
                const shape = shapeArray.find((shape) => shape["@ptnElement"] === transition.id);
                if (shape) {
                    transition.parseFromShape(shape);
                }
            });
            arcs.forEach(arc => {
                const edge = edgeArray.find((edge) => edge["@ptnElement"] === arc.id);
                if (edge) {
                    arc.parseFromEdge(edge);
                }
            });
        }
        return definitions;
    }
}
exports.default = ModdleDefinitions;
//# sourceMappingURL=ModdleDefinitions.js.map