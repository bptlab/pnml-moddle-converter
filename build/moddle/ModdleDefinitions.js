"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModdleDefinitions = void 0;
const Serializable_1 = require("../helper/Serializable");
const ModdlePTNet_1 = require("./ModdlePTNet");
class ModdleDefinitions extends Serializable_1.Serializable {
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
                "@ptnElement": this.ptNet.id,
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
        const definitions = new ModdleDefinitions({ ptNet: ModdlePTNet_1.ModdlePTNet.parseFromObject(ptNet) });
        const diagram = element["ptnDi:ptnDiagram"];
        if (diagram && diagram["ptnDi:ptnPlane"]) {
            const plane = diagram["ptnDi:ptnPlane"];
            let shapes = (_a = plane["ptnDi:ptnShape"]) !== null && _a !== void 0 ? _a : (plane["#"] ? plane["#"]
                .filter((shape) => shape["ptnDi:ptnShape"] !== undefined)
                .flatMap((shape) => Array.isArray(shape["ptnDi:ptnShape"])
                ? shape["ptnDi:ptnShape"]
                : [shape["ptnDi:ptnShape"]]) : []);
            if (!Array.isArray(shapes)) {
                shapes = [shapes];
            }
            const shapeArray = shapes;
            let edges = (_b = plane["ptnDi:ptnEdge"]) !== null && _b !== void 0 ? _b : (plane["#"] ? plane["#"]
                .filter((edge) => edge["ptnDi:ptnEdge"] !== undefined)
                .flatMap((edge) => Array.isArray(edge["ptnDi:ptnEdge"])
                ? edge["ptnDi:ptnEdge"]
                : [edge["ptnDi:ptnEdge"]]) : []);
            if (!Array.isArray(edges)) {
                edges = [edges];
            }
            const edgeArray = edges;
            const { places, transitions, arcs } = definitions.ptNet;
            places.forEach(place => {
                const shape = shapeArray.find(shape => shape["@ptnElement"] === place.id);
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
exports.ModdleDefinitions = ModdleDefinitions;
//# sourceMappingURL=ModdleDefinitions.js.map