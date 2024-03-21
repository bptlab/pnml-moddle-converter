import { IPnmlArc } from "./PnmlArc";
import { IPnmlPlace } from "./PnmlPlace";
import ISerializable from "../helper/Serializable";
import { IPnmlTransition } from "./PnmlTransition";

export interface IPnmlPageData {
  id: string;
  places: IPnmlPlace[];
  transitions: IPnmlTransition[];
  arcs: IPnmlArc[];
}

export interface IPnmlPage extends IPnmlPageData, ISerializable {}
