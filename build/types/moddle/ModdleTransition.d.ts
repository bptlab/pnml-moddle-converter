import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { ModdleXmlShape, ModdleXmlTransition } from "./interfaces/ModdleXml";
import { ModdleBounds } from "./interfaces/ModdleBounds";
import { IModdleDiagramNode } from "./interfaces/ModdleDiagramNode";
export interface IModdleTransitionData {
    id: string;
    name?: string | undefined;
    bounds?: ModdleBounds | undefined;
    labelBounds?: ModdleBounds | undefined;
    isSilent?: boolean | undefined;
}
export interface IModdleTransition extends IModdleTransitionData, IModdleDiagramNode, ISerializable {
    getDiagramDataForSerialization(): ModdleXmlShape;
    parseFromShape(shape: ModdleXmlShape): void;
}
export declare class ModdleTransition extends Serializable implements IModdleTransition {
    id: string;
    name?: string | undefined;
    bounds?: ModdleBounds | undefined;
    labelBounds?: ModdleBounds | undefined;
    isSilent?: boolean | undefined;
    constructor(data: IModdleTransitionData);
    getDiagramDataForSerialization(): ModdleXmlShape;
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: ModdleXmlTransition): ModdleTransition;
    parseFromShape(shape: ModdleXmlShape): void;
}
