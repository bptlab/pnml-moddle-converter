
import ISerializable from "../helper/Serializable";
import { IModdleArc } from "./ModdleArc";
import { IModdlePlace } from "./ModdlePlace";
import { IModdleTransition } from "./ModdleTransition";

export interface IModdlePTNetData {
  id: string;
  name?: string | undefined;
  places: IModdlePlace[];
  transitions: IModdleTransition[];
  arcs: IModdleArc[];
}

export interface IModdlePTNet extends IModdlePTNetData, ISerializable {}
