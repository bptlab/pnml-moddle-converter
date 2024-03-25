"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnmlDocument = void 0;
const PnmlNet_1 = require("./PnmlNet");
const Serializable_1 = require("../helper/Serializable");
const nameSpace = "http://www.pnml.org/version-2009/grammar/pnml";
class PnmlDocument extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { nets } = data;
        this.nets = nets;
        this.children = nets;
    }
    getDataForSerialization() {
        const petriNetDocument = { "@xmlns": nameSpace };
        return { pnml: petriNetDocument };
    }
    static parseFromObject(element) {
        let { net = [] } = element;
        if (!Array.isArray(net)) {
            net = [net];
        }
        const nets = net.map((net) => PnmlNet_1.PnmlNet.parseFromObject(net));
        return new PnmlDocument({ nets });
    }
}
exports.PnmlDocument = PnmlDocument;
//# sourceMappingURL=PnmlDocument.js.map