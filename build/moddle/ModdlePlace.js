"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModdlePlace = void 0;
const Serializable_1 = require("../helper/Serializable");
class ModdlePlace extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, name, marking, bounds, labelBounds } = data;
        this.id = id;
        this.name = name;
        this.marking = marking;
        this.bounds = bounds;
        this.labelBounds = labelBounds;
    }
    getDiagramDataForSerialization() {
        const shape = {
            "@id": `${this.id}_di`,
            "@ptnElement": this.id,
            "dc:Bounds": this.bounds ? {
                "@x": this.bounds.x.toString(),
                "@y": this.bounds.y.toString(),
                "@width": this.bounds.width.toString(),
                "@height": this.bounds.height.toString(),
            } : undefined,
            "ptnDi:label": this.labelBounds ? {
                "dc:Bounds": {
                    "@x": this.labelBounds.x.toString(),
                    "@y": this.labelBounds.y.toString(),
                    "@width": this.labelBounds.width.toString(),
                    "@height": this.labelBounds.height.toString(),
                }
            } : undefined,
        };
        return shape;
    }
    getDataForSerialization() {
        const place = {
            "@id": this.id,
            "@name": this.name,
            "@marking": this.marking.toString(),
        };
        return { "ptn:place": place };
    }
    static parseFromObject(element) {
        var _a;
        const id = element["@id"];
        const name = element["@name"];
        const marking = parseInt((_a = element["@marking"]) !== null && _a !== void 0 ? _a : "0");
        return new ModdlePlace({ id, name, marking });
    }
    parseFromShape(shape) {
        const bounds = shape["dc:Bounds"];
        const label = shape["ptnDi:label"];
        this.bounds = (bounds ? {
            x: parseInt(bounds["@x"]),
            y: parseInt(bounds["@y"]),
            width: parseInt(bounds["@width"]),
            height: parseInt(bounds["@height"]),
        } : undefined);
        this.labelBounds = (label ? {
            x: parseInt(label["dc:Bounds"]["@x"]),
            y: parseInt(label["dc:Bounds"]["@y"]),
            width: parseInt(label["dc:Bounds"]["@width"]),
            height: parseInt(label["dc:Bounds"]["@height"]),
        } : undefined);
    }
}
exports.ModdlePlace = ModdlePlace;
//# sourceMappingURL=ModdlePlace.js.map