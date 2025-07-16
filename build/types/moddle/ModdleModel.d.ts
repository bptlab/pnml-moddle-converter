import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { IModdlePlace } from "./ModdlePlace";
import { IModdleTransition } from "./ModdleTransition";
import { IModdleArc } from "./ModdleArc";
import { ModdleXmlModel } from "./interfaces/ModdleXml";
export interface IModdleModelData {
    id?: string | undefined;
    name?: string | undefined;
    places: IModdlePlace[];
    transitions: IModdleTransition[];
    arcs: IModdleArc[];
}
export interface IModdleModel extends IModdleModelData, ISerializable {
}
export declare class ModdleModel extends Serializable implements IModdleModel {
    id?: string | undefined;
    name?: string | undefined;
    places: IModdlePlace[];
    transitions: IModdleTransition[];
    arcs: IModdleArc[];
    constructor(data: IModdleModelData);
    getChildren(): ISerializable[];
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: ModdleXmlModel): ModdleModel;
}
