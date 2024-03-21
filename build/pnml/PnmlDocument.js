"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serializable_1 = __importDefault(require("../helper/Serializable"));
const PnmlNet_1 = __importDefault(require("./PnmlNet"));
const nameSpace = "http://www.pnml.org/version-2009/grammar/pnml";
class PnmlDocument extends Serializable_1.default {
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
        const nets = net.map((net) => PnmlNet_1.default.parseFromObject(net));
        return new PnmlDocument({ nets });
    }
}
exports.default = PnmlDocument;
//# sourceMappingURL=PnmlDocument.js.map