import Serializable from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { IPnmlNet } from "./PnmlNet";
import ISerializable from "../helper/Serializable";
import { PnmlXmlDocument } from "./interfaces/PnmlXml";
export interface IPnmlDocumentData {
    nets: IPnmlNet[];
}
export interface IPnmlDocument extends IPnmlDocumentData, ISerializable {
}
export default class PnmlDocument extends Serializable implements IPnmlDocument {
    nets: IPnmlNet[];
    constructor(data: IPnmlDocumentData);
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlDocument): PnmlDocument;
}
