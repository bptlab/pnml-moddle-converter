import Serializable from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { IPnmlPlace } from "./PnmlPlace";
import { IPnmlTransition } from "./PnmlTransition";
import { IPnmlArc } from "./PnmlArc";
import ISerializable from "../helper/Serializable";
import { PnmlXmlPage } from "./interfaces/PnmlXml";
export interface IPnmlPageData {
    id: string;
    places: IPnmlPlace[];
    transitions: IPnmlTransition[];
    arcs: IPnmlArc[];
}
export interface IPnmlPage extends IPnmlPageData, ISerializable {
}
export default class PnmlPage extends Serializable implements IPnmlPage {
    id: string;
    places: IPnmlPlace[];
    transitions: IPnmlTransition[];
    arcs: IPnmlArc[];
    constructor(data: IPnmlPageData);
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlPage): IPnmlPage;
}
