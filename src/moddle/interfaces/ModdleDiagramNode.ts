import { ExpandObject } from "xmlbuilder2/lib/interfaces";

export interface IModdleDiagramNode {
  getDiagramDataForSerialization(): ExpandObject;
}
