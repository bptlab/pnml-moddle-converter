import { ExpandObject, XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export interface ISerializable {
    serialize(): string;
    importChildren(xmlBuilder: XMLBuilder): void;
    getDataForSerialization(): ExpandObject;
    toXmlBuilder(): XMLBuilder;
    getXmlBuilder(node: ExpandObject): XMLBuilder;
    parseFromObject(element: ExpandObject): ISerializable;
    getChildren(): ISerializable[];
}
export declare abstract class Serializable implements ISerializable {
    parseFromObject(element: ExpandObject): ISerializable;
    getChildren(): ISerializable[];
    serialize(): string;
    serializeModdle(): string;
    importChildren(xmlBuilder: XMLBuilder): void;
    getDataForSerialization(): ExpandObject;
    toXmlBuilder(): XMLBuilder;
    getXmlBuilder(node: ExpandObject): XMLBuilder;
    static parseFromObject(element: ExpandObject): ISerializable;
}
