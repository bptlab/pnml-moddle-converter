import Serializable from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import ISerializable from "../helper/Serializable";
import { PnmlXmlArc } from "./interfaces/PnmlXml";
export interface IPnmlArcData {
    id: string;
    source: string;
    target: string;
    weight?: number | undefined;
}
export interface IPnmlArc extends IPnmlArcData, ISerializable {
}
export default class PnmlArc extends Serializable implements IPnmlArc {
    id: string;
    source: string;
    target: string;
    weight: number | undefined;
    constructor(data: IPnmlArcData);
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlArc): PnmlArc;
}
