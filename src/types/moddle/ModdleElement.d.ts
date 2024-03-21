import { ExpandObject } from "xmlbuilder2/lib/interfaces";

export interface ModdlePoint {
  x: number;
  y: number;
}

export interface ModdleBounds extends ModdlePoint {
  width: number;
  height: number;
}

export interface IModdleDiagramNode {
  getDiagramDataForSerialization(): ExpandObject;
}
