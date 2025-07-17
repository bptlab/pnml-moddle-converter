import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { PnmlPosition } from "./interfaces/PnmlPosition";
import { PnmlXmlTransition } from "./interfaces/PnmlXml";
export interface IPnmlTransitionData {
    id: string;
    label?: string | undefined;
    nodePosition?: PnmlPosition | undefined;
    labelOffset?: PnmlPosition | undefined;
    silent?: boolean | undefined;
}
export interface IPnmlTransition extends IPnmlTransitionData, ISerializable {
}
export declare class PnmlTransition extends Serializable implements IPnmlTransition {
    id: string;
    label: string | undefined;
    nodePosition: PnmlPosition | undefined;
    labelOffset: PnmlPosition | undefined;
    silent: boolean | undefined;
    constructor(data: IPnmlTransitionData);
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlTransition): PnmlTransition;
}
