"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnmlTransition = void 0;
const Serializable_1 = require("../helper/Serializable");
class PnmlTransition extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, label, nodePosition, labelOffset } = data;
        this.id = id;
        this.label = label;
        this.nodePosition = nodePosition;
        this.labelOffset = labelOffset;
    }
    getDataForSerialization() {
        const transition = { "@id": this.id };
        if (this.label != undefined) {
            transition.name = {
                text: this.label,
            };
            if (this.labelOffset !== undefined) {
                transition.name.graphics = {
                    offset: {
                        "@x": this.labelOffset.x.toString(),
                        "@y": this.labelOffset.y.toString(),
                    },
                };
            }
        }
        if (this.nodePosition !== undefined) {
            transition.graphics = {
                position: {
                    "@x": this.nodePosition.x.toString(),
                    "@y": this.nodePosition.y.toString(),
                },
            };
        }
        return { transition };
    }
    static parseFromObject(element) {
        var _a, _b, _c, _d;
        const id = element["@id"];
        const label = (_a = element.name) === null || _a === void 0 ? void 0 : _a.text;
        const labelOffset = ((_c = (_b = element.name) === null || _b === void 0 ? void 0 : _b.graphics) === null || _c === void 0 ? void 0 : _c.offset)
            ? {
                x: parseInt(element.name.graphics.offset["@x"]),
                y: parseInt(element.name.graphics.offset["@y"]),
            }
            : undefined;
        const nodePosition = ((_d = element.graphics) === null || _d === void 0 ? void 0 : _d.position)
            ? {
                x: parseInt(element.graphics.position["@x"]),
                y: parseInt(element.graphics.position["@y"]),
            }
            : undefined;
        return new PnmlTransition({ id, label, nodePosition, labelOffset });
    }
}
exports.PnmlTransition = PnmlTransition;
//# sourceMappingURL=PnmlTransition.js.map