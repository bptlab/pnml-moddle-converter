import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { ModdleXmlPlace, ModdleXmlShape } from "./interfaces/ModdleXml";
import { IModdleDiagramNode } from "./interfaces/ModdleDiagramNode";
import { ModdleBounds } from "./interfaces/ModdleBounds";
export interface IModdlePlaceData {
    id: string;
    name?: string | undefined;
    marking: number;
    bounds?: ModdleBounds | undefined;
    labelBounds?: ModdleBounds | undefined;
}
export interface IModdlePlace extends IModdlePlaceData, IModdleDiagramNode, ISerializable {
    getDiagramDataForSerialization(): ModdleXmlShape;
    parseFromShape(shape: ModdleXmlShape): void;
}
export declare class ModdlePlace extends Serializable implements IModdlePlace {
    id: string;
    name?: string | undefined;
    marking: number;
    bounds?: ModdleBounds | undefined;
    labelBounds?: ModdleBounds | undefined;
    constructor(data: IModdlePlaceData);
    getDiagramDataForSerialization(): ModdleXmlShape;
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: ModdleXmlPlace): ModdlePlace;
    parseFromShape(shape: ModdleXmlShape): void;
}
