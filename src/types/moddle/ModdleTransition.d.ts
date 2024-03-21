
import ISerializable from "../helper/Serializable";
import { IModdleDiagramNode, ModdleBounds } from "./ModdleElement";
import { ModdleXmlShape } from "./ModdleXml";

export interface IModdleTransitionData {
  id: string;
  name?: string | undefined;
  bounds?: ModdleBounds | undefined;
  labelBounds?: ModdleBounds | undefined;
}

export interface IModdleTransition extends IModdleTransitionData, IModdleDiagramNode, ISerializable {
  getDiagramDataForSerialization(): ModdleXmlShape;
  parseFromShape(shape: ModdleXmlShape): void;
}
