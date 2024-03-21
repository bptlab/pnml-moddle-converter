
import ISerializable from "../helper/Serializable";
import { IModdleDiagramNode, ModdleBounds, ModdlePoint } from "./ModdleElement";
import { ModdleXmlEdge } from "./ModdleXml";

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
