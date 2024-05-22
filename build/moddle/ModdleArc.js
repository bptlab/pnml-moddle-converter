"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModdleArc = void 0;
const Serializable_1 = require("../helper/Serializable");
class ModdleArc extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, weight, source, target, waypoints, labelBounds } = data;
        this.id = id;
        this.source = source;
        this.target = target;
        this.weight = weight;
        this.waypoints = waypoints;
        this.labelBounds = labelBounds;
    }
    getDiagramDataForSerialization() {
        var _a, _b;
        const edge = {
            "@id": `${this.id}_di`,
            "@ptnElement": this.id,
            "ptnDi:waypoint": (_b = (_a = this.waypoints) === null || _a === void 0 ? void 0 : _a.map((point) => ({
                "@x": point.x.toString(),
                "@y": point.y.toString(),
            }))) !== null && _b !== void 0 ? _b : [],
            "ptnDi:label": this.labelBounds ? {
                "dc:Bounds": {
                    "@x": this.labelBounds.x.toString(),
                    "@y": this.labelBounds.y.toString(),
                    "@width": this.labelBounds.width.toString(),
                    "@height": this.labelBounds.height.toString(),
                }
            } : undefined,
        };
        return edge;
    }
    getDataForSerialization() {
        var _a;
        const arc = {
            "@id": this.id,
            "@source": this.source,
            "@target": this.target,
            "@weight": ((_a = this.weight) !== null && _a !== void 0 ? _a : 1).toString(),
        };
        return { "ptn:arc": arc };
    }
    static parseFromObject(element) {
        const id = element["@id"];
        const source = element["@source"];
        const target = element["@target"];
        const weight = element["@weight"] ? parseInt(element["@weight"]) : undefined;
        return new ModdleArc({ id, source, target, weight });
    }
    parseFromEdge(edge) {
        var _a;
        let waypoints = (_a = edge["ptnDi:waypoint"]) !== null && _a !== void 0 ? _a : [];
        if (!Array.isArray(waypoints)) {
            waypoints = [waypoints];
        }
        const label = edge["ptnDi:label"];
        this.waypoints = waypoints.map((waypoint) => ({
            x: parseInt(waypoint["@x"]),
            y: parseInt(waypoint["@y"]),
        }));
        this.labelBounds = (label ? {
            x: parseInt(label["dc:Bounds"]["@x"]),
            y: parseInt(label["dc:Bounds"]["@y"]),
            width: parseInt(label["dc:Bounds"]["@width"]),
            height: parseInt(label["dc:Bounds"]["@height"]),
        } : undefined);
    }
}
exports.ModdleArc = ModdleArc;
