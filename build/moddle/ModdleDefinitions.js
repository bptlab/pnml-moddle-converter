"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModdleDefinitions = void 0;
const Serializable_1 = require("../helper/Serializable");
const ModdleModel_1 = require("./ModdleModel");
class ModdleDefinitions extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { model } = data;
        this.model = model;
    }
    getChildren() {
        return [this.model];
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
     * Since the graphical information is stored in the children of the Model, this method
     * is overwritten to append the graphical information to the XMLBuilder.
     * @returns XMLBuilder with diagram data
     */
    toXmlBuilder() {
        const xmlBuilder = super.toXmlBuilder();
        const diagram = {
            "@id": `${this.model.id}_di`,
            "ptnDi:plane": {
                "@id": `${this.model.id}_plane`,
                "@modelElement": this.model.id,
                "ptnDi:diagramShape": [
                    ...this.model.places.map((place) => place.getDiagramDataForSerialization()),
                    ...this.model.transitions.map((transition) => transition.getDiagramDataForSerialization()),
                ],
                "ptnDi:diagramEdge": this.model.arcs.map((arc) => arc.getDiagramDataForSerialization()),
            },
        };
        const diagramBuilder = this.getXmlBuilder({ "ptnDi:diagram": diagram });
        xmlBuilder.import(diagramBuilder);
        return xmlBuilder;
    }
    static parseFromObject(element) {
        var _a, _b;
        const model = element["ptn:model"];
        if (!model)
            throw new Error("No Model found in Definitions");
        const definitions = new ModdleDefinitions({
            model: ModdleModel_1.ModdleModel.parseFromObject(model),
        });
        const diagram = element["ptnDi:diagram"];
        if (diagram && diagram["ptnDi:plane"]) {
            const plane = diagram["ptnDi:plane"];
            let shapes = (_a = plane["ptnDi:diagramShape"]) !== null && _a !== void 0 ? _a : (plane["#"]
                ? plane["#"]
                    .filter((shape) => shape["ptnDi:diagramShape"] !== undefined)
                    .flatMap((shape) => Array.isArray(shape["ptnDi:diagramShape"])
                    ? shape["ptnDi:diagramShape"]
                    : [shape["ptnDi:diagramShape"]])
                : []);
            if (!Array.isArray(shapes)) {
                shapes = [shapes];
            }
            const shapeArray = shapes;
            let edges = (_b = plane["ptnDi:diagramEdge"]) !== null && _b !== void 0 ? _b : (plane["#"]
                ? plane["#"]
                    .filter((edge) => edge["ptnDi:diagramEdge"] !== undefined)
                    .flatMap((edge) => Array.isArray(edge["ptnDi:diagramEdge"])
                    ? edge["ptnDi:diagramEdge"]
                    : [edge["ptnDi:diagramEdge"]])
                : []);
            if (!Array.isArray(edges)) {
                edges = [edges];
            }
            const edgeArray = edges;
            const { places, transitions, arcs } = definitions.model;
            places.forEach((place) => {
                const shape = shapeArray.find((shape) => shape["@modelElement"] === place.id);
                if (shape) {
                    place.parseFromShape(shape);
                }
            });
            transitions.forEach((transition) => {
                const shape = shapeArray.find((shape) => shape["@modelElement"] === transition.id);
                if (shape) {
                    transition.parseFromShape(shape);
                }
            });
            arcs.forEach((arc) => {
                const edge = edgeArray.find((edge) => edge["@modelElement"] === arc.id);
                if (edge) {
                    arc.parseFromEdge(edge);
                }
            });
        }
        return definitions;
    }
}
exports.ModdleDefinitions = ModdleDefinitions;
