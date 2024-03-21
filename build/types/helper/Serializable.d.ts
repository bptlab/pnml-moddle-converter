import { ExpandObject, XMLBuilder } from 'xmlbuilder2/lib/interfaces';
export default interface ISerializable {
    children: ISerializable[];
    serialize(): string;
    importChildren(xmlBuilder: XMLBuilder): void;
    getDataForSerialization(): ExpandObject;
    toXmlBuilder(): XMLBuilder;
    getXmlBuilder(node: ExpandObject): XMLBuilder;
    parseFromObject(element: ExpandObject): ISerializable;
}
export default abstract class Serializable implements ISerializable {
    children: ISerializable[];
    serializeModdle(): string;
    static parseFromObject(element: ExpandObject): ISerializable;
}
