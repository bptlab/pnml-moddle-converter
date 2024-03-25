import { Serializable, ISerializable } from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { PnmlXmlArc } from "./interfaces/PnmlXml";

export interface IPnmlArcData {
  id: string;
  source: string;
  target: string;
  weight?: number | undefined;
}

export interface IPnmlArc extends IPnmlArcData, ISerializable {}

export class PnmlArc extends Serializable implements IPnmlArc {

  id: string;
  source: string ;
  target: string ;
  weight: number | undefined;

  constructor(data: IPnmlArcData) {
    super();
    const { id, weight, source, target } = data;
    this.id = id;
    this.source = source;
    this.target = target;
    this.weight = weight;
  }

  getDataForSerialization(): ExpandObject {

    const arc: PnmlXmlArc = { 
      "@id": this.id,
      "@source": this.source,
      "@target": this.target,
    };

    if (this.weight != undefined) {
      arc.inscription = {
        text: this.weight.toString(),
      }
    }

    return { arc };
  }
  
  static parseFromObject(element: PnmlXmlArc): PnmlArc {
    const id = element["@id"];
    const source = element["@source"];
    const target = element["@target"];
    const weight = element.inscription ? parseInt(element.inscription.text) : undefined;
    return new PnmlArc({ id, source, target, weight });
  }
}
