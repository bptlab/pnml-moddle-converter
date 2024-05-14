import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { IModdlePlace } from "./ModdlePlace";
import { IModdleTransition } from "./ModdleTransition";
import { IModdleArc } from "./ModdleArc";
import { ModdleXmlPTNet } from "./interfaces/ModdleXml";
export interface IModdlePTNetData {
    id?: string | undefined;
    name?: string | undefined;
    places: IModdlePlace[];
    transitions: IModdleTransition[];
    arcs: IModdleArc[];
}
export interface IModdlePTNet extends IModdlePTNetData, ISerializable {
}
export declare class ModdlePTNet extends Serializable implements IModdlePTNet {
    id?: string | undefined;
    name?: string | undefined;
    places: IModdlePlace[];
    transitions: IModdleTransition[];
    arcs: IModdleArc[];
    constructor(data: IModdlePTNetData);
    getChildren(): ISerializable[];
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: ModdleXmlPTNet): ModdlePTNet;
}
