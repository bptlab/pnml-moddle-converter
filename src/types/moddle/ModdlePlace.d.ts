
import ISerializable from "../helper/Serializable";
import { IModdleDiagramNode, ModdleBounds } from "./ModdleElement";
import { ModdleXmlShape } from "./ModdleXml";

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
