"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serializable_1 = __importDefault(require("../helper/Serializable"));
const PnmlPlace_1 = __importDefault(require("./PnmlPlace"));
const PnmlTransition_1 = __importDefault(require("./PnmlTransition"));
const PnmlArc_1 = __importDefault(require("./PnmlArc"));
class PnmlPage extends Serializable_1.default {
    constructor(data) {
        super();
        const { id, places = [], transitions = [], arcs = [] } = data;
        this.id = id;
        this.places = places;
        this.transitions = transitions;
        this.arcs = arcs;
        this.children = [...places, ...transitions, ...arcs];
    }
    getDataForSerialization() {
        const page = { "@id": this.id };
        return { page };
    }
    static parseFromObject(element) {
        const id = element["@id"];
        let { place = [], transition = [], arc = [], } = element;
        if (!Array.isArray(place)) {
            place = [place];
        }
        if (!Array.isArray(transition)) {
            transition = [transition];
        }
        if (!Array.isArray(arc)) {
            arc = [arc];
        }
        const places = place.map((place) => PnmlPlace_1.default.parseFromObject(place));
        const transitions = transition.map((transition) => PnmlTransition_1.default.parseFromObject(transition));
        const arcs = arc.map((arc) => PnmlArc_1.default.parseFromObject(arc));
        return new PnmlPage({ id, places, transitions, arcs });
    }
}
exports.default = PnmlPage;
//# sourceMappingURL=PnmlPage.js.map