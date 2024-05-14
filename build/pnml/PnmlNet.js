"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnmlNet = exports.PnmlNetType = void 0;
const Serializable_1 = require("../helper/Serializable");
const PnmlPage_1 = require("./PnmlPage");
var PnmlNetType;
(function (PnmlNetType) {
    PnmlNetType["PtNet"] = "http://www.pnml.org/version-2009/grammar/ptnet";
})(PnmlNetType || (exports.PnmlNetType = PnmlNetType = {}));
class PnmlNet extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, type, name, pages = [] } = data;
        this.id = id;
        this.type = type.toString();
        this.pages = pages;
        this.name = name;
    }
    getChildren() {
        return this.pages;
    }
    getDataForSerialization() {
        const net = { "@id": this.id, "@type": this.type };
        if (this.name != undefined) {
            net.name = {
                text: this.name,
            };
        }
        return { net };
    }
    static parseFromObject(element) {
        var _a, _b;
        const id = element["@id"];
        const type = element["@type"];
        const name = typeof ((_a = element.name) === null || _a === void 0 ? void 0 : _a.text) === "string" ? (_b = element.name) === null || _b === void 0 ? void 0 : _b.text : undefined;
        let { page = [] } = element;
        if (!Array.isArray(page)) {
            page = [page];
        }
        const pages = page.map((page) => PnmlPage_1.PnmlPage.parseFromObject(page));
        return new PnmlNet({ id, type, name, pages });
    }
}
exports.PnmlNet = PnmlNet;
//# sourceMappingURL=PnmlNet.js.map