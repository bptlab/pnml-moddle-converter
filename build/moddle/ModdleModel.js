"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModdleModel = void 0;
const Serializable_1 = require("../helper/Serializable");
const ModdlePlace_1 = require("./ModdlePlace");
const ModdleTransition_1 = require("./ModdleTransition");
const ModdleArc_1 = require("./ModdleArc");
class ModdleModel extends Serializable_1.Serializable {
    constructor(data) {
        super();
        const { id, name, places, transitions, arcs } = data;
        this.id = id;
        this.name = name;
        this.places = places;
        this.transitions = transitions;
        this.arcs = arcs;
    }
    getChildren() {
        return [...this.places, ...this.transitions, ...this.arcs];
    }
    getDataForSerialization() {
        const model = {
            "@id": this.id,
            "ptn:name": this.name,
        };
        return { "ptn:model": model };
    }
    static parseFromObject(element) {
        var _a, _b;
        const id = (_a = element["@id"]) !== null && _a !== void 0 ? _a : (element["@"] ? element["@"]["id"] : undefined);
        let name = undefined;
        if (element["ptn:name"]) {
            name = element["ptn:name"];
        }
        else if (element["#"] !== undefined) {
            name = (_b = element["#"].find((child) => child["ptn:name"] !== undefined)) === null || _b === void 0 ? void 0 : _b["ptn:name"];
        }
        let places = [];
        if (element["ptn:place"]) {
            if (Array.isArray(element["ptn:place"])) {
                places = element["ptn:place"].map((place) => ModdlePlace_1.ModdlePlace.parseFromObject(place));
            }
            else {
                places = [ModdlePlace_1.ModdlePlace.parseFromObject(element["ptn:place"])];
            }
        }
        else if (element["#"] !== undefined) {
            places = element["#"]
                .filter((child) => child["ptn:place"] !== undefined)
                .flatMap((child) => {
                const place = child["ptn:place"];
                return Array.isArray(place) ? place : [place];
            })
                .map((place) => ModdlePlace_1.ModdlePlace.parseFromObject(place));
        }
        let transitions = [];
        if (element["ptn:transition"]) {
            if (Array.isArray(element["ptn:transition"])) {
                transitions = element["ptn:transition"].map((transition) => ModdleTransition_1.ModdleTransition.parseFromObject(transition));
            }
            else {
                transitions = [
                    ModdleTransition_1.ModdleTransition.parseFromObject(element["ptn:transition"]),
                ];
            }
        }
        else if (element["#"] !== undefined) {
            transitions = element["#"]
                .filter((child) => child["ptn:transition"] !== undefined)
                .flatMap((child) => {
                const transition = child["ptn:transition"];
                return Array.isArray(transition) ? transition : [transition];
            })
                .map((transition) => ModdleTransition_1.ModdleTransition.parseFromObject(transition));
        }
        let arcs = [];
        if (element["ptn:arc"]) {
            if (Array.isArray(element["ptn:arc"])) {
                arcs = element["ptn:arc"].map((arc) => ModdleArc_1.ModdleArc.parseFromObject(arc));
            }
            else {
                arcs = [ModdleArc_1.ModdleArc.parseFromObject(element["ptn:arc"])];
            }
        }
        else if (element["#"] !== undefined) {
            arcs = element["#"]
                .filter((child) => child["ptn:arc"] !== undefined)
                .flatMap((child) => {
                const arc = child["ptn:arc"];
                return Array.isArray(arc) ? arc : [arc];
            })
                .map((arc) => ModdleArc_1.ModdleArc.parseFromObject(arc));
        }
        return new ModdleModel({ id, name, places, transitions, arcs });
    }
}
exports.ModdleModel = ModdleModel;
