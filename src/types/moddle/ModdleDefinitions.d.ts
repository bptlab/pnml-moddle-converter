
import ISerializable from "../helper/Serializable";
import { IModdlePTNet } from "./ModdlePTNet";

export interface IModdleDefinitionsData {
  ptNet: IModdlePTNet;
}

export interface IModdleDefinitions extends IModdleDefinitionsData, ISerializable {}
