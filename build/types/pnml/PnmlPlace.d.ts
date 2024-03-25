import { Serializable, ISerializable } from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { PnmlPosition } from "./interfaces/PnmlPosition";
import { PnmlXmlPlace } from "./interfaces/PnmlXml";
export interface IPnmlPlaceData {
    id: string;
    label?: string | undefined;
    initialMarking?: number | undefined;
    nodePosition?: PnmlPosition | undefined;
    labelOffset?: PnmlPosition | undefined;
    initialMarkingOffset?: PnmlPosition | undefined;
}
export interface IPnmlPlace extends IPnmlPlaceData, ISerializable {
}
export declare class PnmlPlace extends Serializable implements IPnmlPlace {
    id: string;
    label: string | undefined;
    initialMarking: number | undefined;
    nodePosition: PnmlPosition | undefined;
    labelOffset: PnmlPosition | undefined;
    initialMarkingOffset: PnmlPosition | undefined;
    constructor(data: IPnmlPlaceData);
    getDataForSerialization(): ExpandObject;
    static parseFromObject(element: PnmlXmlPlace): PnmlPlace;
}
