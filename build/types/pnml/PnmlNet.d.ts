import Serializable from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { IPnmlPage } from "./PnmlPage";
import ISerializable from "../helper/Serializable";
import { PnmlXmlNet } from "./interfaces/PnmlXml";
export declare enum PnmlNetType {
    PtNet = "http://www.pnml.org/version-2009/grammar/ptnet"
}
export interface IPnmlNetData {
    id: string;
    type: string;
    pages: IPnmlPage[];
    name?: string | undefined;
}
export interface IPnmlNet extends IPnmlNetData, ISerializable {
}
export default class PnmlNet extends Serializable implements IPnmlNet {
    id: string;
    type: string;
    pages: IPnmlPage[];
    name?: string | undefined;
    constructor(data: IPnmlNetData);
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlNet): IPnmlNet;
}
