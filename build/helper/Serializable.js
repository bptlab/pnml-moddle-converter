"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializable = void 0;
const xmlbuilder2_1 = require("xmlbuilder2");
class Serializable {
    constructor() {
        this.children = [];
    }
    parseFromObject(element) {
        throw new Error('Method not implemented.');
    }
    serialize() {
        const xmlBuilder = this.toXmlBuilder();
        return xmlBuilder.end({ prettyPrint: true });
    }
    serializeModdle() {
        const xmlBuilder = this.toXmlBuilder();
        return xmlBuilder.end({ prettyPrint: true });
    }
    importChildren(xmlBuilder) {
        this.children.forEach((child) => {
            xmlBuilder.import(child.toXmlBuilder());
        });
    }
    getDataForSerialization() {
        throw new Error('Method not implemented.');
    }
    toXmlBuilder() {
        const xmlBuilder = this.getXmlBuilder(this.getDataForSerialization());
        this.importChildren(xmlBuilder);
        return xmlBuilder;
    }
    ;
    getXmlBuilder(node) {
        const xmlBuilder = (0, xmlbuilder2_1.create)({ version: '1.0', encoding: 'UTF-8' });
        return xmlBuilder.ele(node);
    }
    static parseFromObject(element) {
        throw new Error('Method not implemented.');
    }
}
exports.Serializable = Serializable;
//# sourceMappingURL=Serializable.js.map