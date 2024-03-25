import { ExpandObject, XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { IModdlePTNet } from "./ModdlePTNet";
import { ModdleXmlDefinitions } from "./interfaces/ModdleXml";
export interface IModdleDefinitionsData {
    ptNet: IModdlePTNet;
}
export interface IModdleDefinitions extends IModdleDefinitionsData, ISerializable {
}
export declare class ModdleDefinitions extends Serializable implements IModdleDefinitions {
    ptNet: IModdlePTNet;
    constructor(data: IModdleDefinitionsData);
    getDataForSerialization(): ExpandObject;
    /**
     * Definitions specifies the elements as well as graphical information of the model.
     * Since the graphical information is stored in the children of the PTNet, this method
     * is overwritten to append the graphical information to the XMLBuilder.
     * @returns XMLBuilder with diagram data
     */
    toXmlBuilder(): XMLBuilder;
    static parseFromObject(element: ModdleXmlDefinitions): ModdleDefinitions;
}
