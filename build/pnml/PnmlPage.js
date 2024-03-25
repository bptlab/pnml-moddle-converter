"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnmlPage = void 0;
const Serializable_1 = require("../helper/Serializable");
const PnmlPlace_1 = require("./PnmlPlace");
const PnmlTransition_1 = require("./PnmlTransition");
const PnmlArc_1 = require("./PnmlArc");
class PnmlPage extends Serializable_1.Serializable {
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
        const places = place.map((place) => PnmlPlace_1.PnmlPlace.parseFromObject(place));
        const transitions = transition.map((transition) => PnmlTransition_1.PnmlTransition.parseFromObject(transition));
        const arcs = arc.map((arc) => PnmlArc_1.PnmlArc.parseFromObject(arc));
        return new PnmlPage({ id, places, transitions, arcs });
    }
}
exports.PnmlPage = PnmlPage;
//# sourceMappingURL=PnmlPage.js.map