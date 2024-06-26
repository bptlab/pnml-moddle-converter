import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { IPnmlNet } from "./PnmlNet";
import { Serializable, ISerializable } from "../helper/Serializable";
import { PnmlXmlDocument } from "./interfaces/PnmlXml";
export interface IPnmlDocumentData {
    nets: IPnmlNet[];
}
export interface IPnmlDocument extends IPnmlDocumentData, ISerializable {
}
export declare class PnmlDocument extends Serializable implements IPnmlDocument {
    nets: IPnmlNet[];
    constructor(data: IPnmlDocumentData);
    getChildren(): ISerializable[];
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlDocument): PnmlDocument;
}
