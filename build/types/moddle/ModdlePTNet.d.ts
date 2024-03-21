import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import Serializable from "../helper/Serializable";
import { IModdlePlace } from "./ModdlePlace";
import { IModdleTransition } from "./ModdleTransition";
import { IModdleArc } from "./ModdleArc";
import ISerializable from "../helper/Serializable";
import { ModdleXmlPTNet } from "./interfaces/ModdleXml";
export interface IModdlePTNetData {
    id: string;
    name?: string | undefined;
    places: IModdlePlace[];
    transitions: IModdleTransition[];
    arcs: IModdleArc[];
}
export interface IModdlePTNet extends IModdlePTNetData, ISerializable {
}
export default class ModdlePTNet extends Serializable implements IModdlePTNet {
    id: string;
    name?: string | undefined;
    places: IModdlePlace[];
    transitions: IModdleTransition[];
    arcs: IModdleArc[];
    constructor(data: IModdlePTNetData);
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: ModdleXmlPTNet): ModdlePTNet;
}
