import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import Serializable from "../helper/Serializable";
import ISerializable from "../helper/Serializable";
import { ModdleXmlArc, ModdleXmlEdge } from "./interfaces/ModdleXml";
import { IModdleDiagramNode } from "./interfaces/ModdleDiagramNode";
import { ModdleBounds } from "./interfaces/ModdleBounds";
import { ModdlePoint } from "./interfaces/ModdlePoint";
export interface IModdleArcData {
    id: string;
    source: string;
    target: string;
    weight?: number | undefined;
    waypoints?: ModdlePoint[] | undefined;
    labelBounds?: ModdleBounds | undefined;
}
export interface IModdleArc extends IModdleArcData, IModdleDiagramNode, ISerializable {
    getDiagramDataForSerialization(): ModdleXmlEdge;
    parseFromEdge(edge: ModdleXmlEdge): void;
}
export default class ModdleArc extends Serializable implements IModdleArc {
    id: string;
    source: string;
    target: string;
    weight?: number | undefined;
    waypoints?: ModdlePoint[] | undefined;
    labelBounds?: ModdleBounds | undefined;
    constructor(data: IModdleArcData);
    getDiagramDataForSerialization(): ModdleXmlEdge;
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: ModdleXmlArc): ModdleArc;
    parseFromEdge(edge: ModdleXmlEdge): void;
}
