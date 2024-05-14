import { Serializable, ISerializable } from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { IPnmlPlace } from "./PnmlPlace";
import { IPnmlTransition } from "./PnmlTransition";
import { IPnmlArc } from "./PnmlArc";
import { PnmlXmlPage } from "./interfaces/PnmlXml";
export interface IPnmlPageData {
    id: string;
    places: IPnmlPlace[];
    transitions: IPnmlTransition[];
    arcs: IPnmlArc[];
}
export interface IPnmlPage extends IPnmlPageData, ISerializable {
}
export declare class PnmlPage extends Serializable implements IPnmlPage {
    id: string;
    places: IPnmlPlace[];
    transitions: IPnmlTransition[];
    arcs: IPnmlArc[];
    constructor(data: IPnmlPageData);
    getChildren(): ISerializable[];
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlPage): IPnmlPage;
}
