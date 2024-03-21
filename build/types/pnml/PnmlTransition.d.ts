import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import Serializable from "../helper/Serializable";
import { PnmlPosition } from "./interfaces/PnmlPosition";
import ISerializable from "../helper/Serializable";
import { PnmlXmlTransition } from "./interfaces/PnmlXml";
export interface IPnmlTransitionData {
    id: string;
    label?: string | undefined;
    nodePosition?: PnmlPosition | undefined;
    labelOffset?: PnmlPosition | undefined;
}
export interface IPnmlTransition extends IPnmlTransitionData, ISerializable {
}
export default class PnmlTransition extends Serializable implements IPnmlTransition {
    id: string;
    label: string | undefined;
    nodePosition: PnmlPosition | undefined;
    labelOffset: PnmlPosition | undefined;
    constructor(data: IPnmlTransitionData);
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlTransition): PnmlTransition;
}
