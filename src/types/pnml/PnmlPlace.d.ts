import { PnmlPosition } from "./PnmlGraphics";
import ISerializable from "../helper/Serializable";

export interface IPnmlPlaceData {
  id: string;
  label?: string | undefined;
  initialMarking?: number | undefined;
  nodePosition?: PnmlPosition | undefined;
  labelOffset?: PnmlPosition | undefined;
  initialMarkingOffset?: PnmlPosition | undefined;
}

export interface IPnmlPlace extends IPnmlPlaceData, ISerializable {}


