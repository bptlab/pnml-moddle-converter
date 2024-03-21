import { IPnmlPage } from "./PnmlPage";
import ISerializable from "../helper/Serializable";

export interface IPnmlNetData {
  id: string;
  type: string;
  pages: IPnmlPage[];
  name?: string | undefined;
}

export interface IPnmlNet extends IPnmlNetData, ISerializable {}
