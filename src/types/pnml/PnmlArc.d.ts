import ISerializable from "../helper/Serializable";

export interface IPnmlArcData {
  id: string;
  source: string;
  target: string;
  weight?: number | undefined;
}

export interface IPnmlArc extends IPnmlArcData, ISerializable {}
