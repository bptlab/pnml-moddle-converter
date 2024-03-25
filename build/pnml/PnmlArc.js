"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnmlArc = void 0;
const Serializable_1 = require("../helper/Serializable");
class PnmlArc extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, weight, source, target } = data;
        this.id = id;
        this.source = source;
        this.target = target;
        this.weight = weight;
    }
    getDataForSerialization() {
        const arc = {
            "@id": this.id,
            "@source": this.source,
            "@target": this.target,
        };
        if (this.weight != undefined) {
            arc.inscription = {
                text: this.weight.toString(),
            };
        }
        return { arc };
    }
    static parseFromObject(element) {
        const id = element["@id"];
        const source = element["@source"];
        const target = element["@target"];
        const weight = element.inscription ? parseInt(element.inscription.text) : undefined;
        return new PnmlArc({ id, source, target, weight });
    }
}
exports.PnmlArc = PnmlArc;
//# sourceMappingURL=PnmlArc.js.map