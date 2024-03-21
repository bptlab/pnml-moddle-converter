import { PnmlPosition } from "./PnmlGraphics";
import ISerializable from "../helper/Serializable";

export interface IPnmlTransitionData {
  id: string;
  label?: string | undefined;
  nodePosition?: PnmlPosition | undefined;
  labelOffset?: PnmlPosition | undefined;
}

export interface IPnmlTransition extends IPnmlTransitionData, ISerializable {}

