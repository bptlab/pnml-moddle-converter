"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModdlePTNet = void 0;
const Serializable_1 = require("../helper/Serializable");
const ModdlePlace_1 = require("./ModdlePlace");
const ModdleTransition_1 = require("./ModdleTransition");
const ModdleArc_1 = require("./ModdleArc");
class ModdlePTNet extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, name, places, transitions, arcs } = data;
        this.id = id;
        this.name = name;
        this.places = places;
        this.transitions = transitions;
        this.arcs = arcs;
        this.children = [...places, ...transitions, ...arcs];
    }
    getDataForSerialization() {
        const ptNet = {
            "@id": this.id,
            "@name": this.name,
        };
        return { "ptn:ptNet": ptNet };
    }
    static parseFromObject(element) {
        const id = element["@id"];
        const name = element["@name"];
        let places = [];
        if (element["ptn:place"]) {
            if (Array.isArray(element["ptn:place"])) {
                places = element["ptn:place"].map((place) => ModdlePlace_1.ModdlePlace.parseFromObject(place));
            }
            else {
                places = [ModdlePlace_1.ModdlePlace.parseFromObject(element["ptn:place"])];
            }
        }
        let transitions = [];
        if (element["ptn:transition"]) {
            if (Array.isArray(element["ptn:transition"])) {
                transitions = element["ptn:transition"].map((transition) => ModdleTransition_1.ModdleTransition.parseFromObject(transition));
            }
            else {
                transitions = [ModdleTransition_1.ModdleTransition.parseFromObject(element["ptn:transition"])];
            }
        }
        let arcs = [];
        if (element["ptn:arc"]) {
            if (Array.isArray(element["ptn:arc"])) {
                arcs = element["ptn:arc"].map((arc) => ModdleArc_1.ModdleArc.parseFromObject(arc));
            }
            else {
                arcs = [ModdleArc_1.ModdleArc.parseFromObject(element["ptn:arc"])];
            }
        }
        return new ModdlePTNet({ id, name, places, transitions, arcs });
    }
}
exports.ModdlePTNet = ModdlePTNet;
//# sourceMappingURL=ModdlePTNet.js.map