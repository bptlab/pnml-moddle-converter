"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnmlPlace = void 0;
const Serializable_1 = require("../helper/Serializable");
class PnmlPlace extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, label, initialMarking, nodePosition, labelOffset, initialMarkingOffset } = data;
        this.id = id;
        this.label = label;
        this.initialMarking = initialMarking;
        this.nodePosition = nodePosition;
        this.labelOffset = labelOffset;
        this.initialMarkingOffset = initialMarkingOffset;
    }
    getDataForSerialization() {
        const place = { "@id": this.id };
        if (this.label != undefined) {
            place.name = {
                text: this.label,
            };
            if (this.labelOffset !== undefined) {
                place.name.graphics = {
                    offset: {
                        "@x": this.labelOffset.x.toString(),
                        "@y": this.labelOffset.y.toString(),
                    },
                };
            }
        }
        if (this.nodePosition !== undefined) {
            place.graphics = {
                position: {
                    "@x": this.nodePosition.x.toString(),
                    "@y": this.nodePosition.y.toString(),
                },
            };
        }
        if (this.initialMarking !== undefined) {
            place.initialMarking = {
                text: this.initialMarking.toString(),
            };
            if (this.initialMarkingOffset !== undefined) {
                place.initialMarking.graphics = {
                    offset: {
                        "@x": this.initialMarkingOffset.x.toString(),
                        "@y": this.initialMarkingOffset.y.toString(),
                    },
                };
            }
        }
        return { place };
    }
    static parseFromObject(element) {
        var _a, _b, _c, _d, _e, _f, _g;
        const id = element["@id"];
        const label = (_a = element.name) === null || _a === void 0 ? void 0 : _a.text;
        const initialMarking = ((_b = element.initialMarking) === null || _b === void 0 ? void 0 : _b.text) ? parseInt(element.initialMarking.text) : undefined;
        const labelOffset = ((_d = (_c = element.name) === null || _c === void 0 ? void 0 : _c.graphics) === null || _d === void 0 ? void 0 : _d.offset)
            ? {
                x: parseInt(element.name.graphics.offset["@x"]),
                y: parseInt(element.name.graphics.offset["@y"]),
            } : undefined;
        const nodePosition = ((_e = element.graphics) === null || _e === void 0 ? void 0 : _e.position) ? {
            x: parseInt(element.graphics.position["@x"]),
            y: parseInt(element.graphics.position["@y"]),
        } : undefined;
        const initialMarkingOffset = ((_g = (_f = element.initialMarking) === null || _f === void 0 ? void 0 : _f.graphics) === null || _g === void 0 ? void 0 : _g.offset)
            ? {
                x: parseInt(element.initialMarking.graphics.offset["@x"]),
                y: parseInt(element.initialMarking.graphics.offset["@y"]),
            } : undefined;
        return new PnmlPlace({ id, label, initialMarking, nodePosition, labelOffset, initialMarkingOffset });
    }
}
exports.PnmlPlace = PnmlPlace;
//# sourceMappingURL=PnmlPlace.js.map