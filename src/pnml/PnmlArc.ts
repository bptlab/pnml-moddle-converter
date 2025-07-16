import { Serializable, ISerializable } from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { PnmlXmlArc } from "./interfaces/PnmlXml";

export interface IPnmlArcData {
  id: string;
  source: string;
  target: string;
  inscription?: string;
}

export interface IPnmlArc extends IPnmlArcData, ISerializable {}

export class PnmlArc extends Serializable implements IPnmlArc {
  id: string;
  source: string;
  target: string;
  inscription?: string;

  constructor(data: IPnmlArcData) {
    super();
    const { id, inscription, source, target } = data;
    this.id = id;
    this.source = source;
    this.target = target;
    this.inscription = inscription;
  }

  getDataForSerialization(): ExpandObject {
    const arc: PnmlXmlArc = {
      "@id": this.id,
      "@source": this.source,
      "@target": this.target,
    };

    if (this.inscription != undefined) {
      arc.inscription = {
        text: this.inscription.toString(),
      };
    }

    return { arc };
  }

  static parseFromObject(element: PnmlXmlArc): PnmlArc {
    const id = element["@id"];
    const source = element["@source"];
    const target = element["@target"];
    const inscription = element.inscription
      ? element.inscription.text
      : undefined;
    return new PnmlArc({ id, source, target, inscription });
  }
}
