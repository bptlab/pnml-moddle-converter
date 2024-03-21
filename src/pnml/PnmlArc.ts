import Serializable from "../helper/Serializable";
import { PnmlXmlArc } from "../types/pnml/PnmlXml";
import { IPnmlArc, IPnmlArcData } from "../types/pnml/PnmlArc";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";

export default class PnmlArc extends Serializable implements IPnmlArc {

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
