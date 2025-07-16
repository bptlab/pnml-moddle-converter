import { ExpandObject, XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { ModdleXmlDefinitions } from "./interfaces/ModdleXml";
import { IModdleModel } from "./ModdleModel";
export interface IModdleDefinitionsData {
    model: IModdleModel;
}
export interface IModdleDefinitions extends IModdleDefinitionsData, ISerializable {
}
export declare class ModdleDefinitions extends Serializable implements IModdleDefinitions {
    model: IModdleModel;
    constructor(data: IModdleDefinitionsData);
    getChildren(): ISerializable[];
    getDataForSerialization(): ExpandObject;
    /**
     * Definitions specifies the elements as well as graphical information of the model.
     * Since the graphical information is stored in the children of the Model, this method
     * is overwritten to append the graphical information to the XMLBuilder.
     * @returns XMLBuilder with diagram data
     */
    toXmlBuilder(): XMLBuilder;
    static parseFromObject(element: ModdleXmlDefinitions): ModdleDefinitions;
}
