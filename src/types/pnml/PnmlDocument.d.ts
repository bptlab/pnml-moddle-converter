import { IPnmlNet } from "./PnmlNet";
import ISerializable from "../helper/Serializable";

export interface IPnmlDocumentData {
  nets: IPnmlNet[];
}

export interface IPnmlDocument extends IPnmlDocumentData, ISerializable {}
