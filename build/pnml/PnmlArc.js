"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnmlArc = void 0;
const Serializable_1 = require("../helper/Serializable");
class PnmlArc extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, inscription, source, target } = data;
        this.id = id;
        this.source = source;
        this.target = target;
        this.inscription = inscription;
    }
    getDataForSerialization() {
        const arc = {
            "@id": this.id,
            "@source": this.source,
            "@target": this.target,
        };
        if (this.inscription != undefined) {
            arc.inscription = {
                text: this.inscription.toString(),
            };
        }
        return { arc };
    }
    static parseFromObject(element) {
        const id = element["@id"];
        const source = element["@source"];
        const target = element["@target"];
        const inscription = element.inscription
            ? element.inscription.text
            : undefined;
        return new PnmlArc({ id, source, target, inscription });
    }
}
exports.PnmlArc = PnmlArc;
