import { Serializable, ISerializable } from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { PnmlPlace, IPnmlPlace } from "./PnmlPlace";
import { PnmlTransition, IPnmlTransition } from "./PnmlTransition";
import { PnmlArc, IPnmlArc } from "./PnmlArc";
import { PnmlXmlPage } from "./interfaces/PnmlXml";

export interface IPnmlPageData {
  id: string;
  places: IPnmlPlace[];
  transitions: IPnmlTransition[];
  arcs: IPnmlArc[];
}

export interface IPnmlPage extends IPnmlPageData, ISerializable {}

export class PnmlPage extends Serializable implements IPnmlPage {

  id: string;
  places: IPnmlPlace[];
  transitions: IPnmlTransition[];
  arcs: IPnmlArc[];

  constructor(data: IPnmlPageData) {
    super();
    const { id, places = [], transitions = [], arcs = [] } = data;
    this.id = id;
    this.places = places;
    this.transitions = transitions;
    this.arcs = arcs;
  }

  getChildren(): ISerializable[] {
    return [...this.places, ...this.transitions, ...this.arcs];
  }

  getDataForSerialization(): ExpandObject {
    const page: PnmlXmlPage = { "@id": this.id };
    return { page };
  }

  static parseFromObject(element: PnmlXmlPage): IPnmlPage {
    const id = element["@id"];
    let { 
      place = [],
      transition = [],
      arc = [],  
    } = element;

    if (!Array.isArray(place)) {
      place = [place];
    }
    if (!Array.isArray(transition)) {
      transition = [transition];
    }
    if (!Array.isArray(arc)) {
      arc = [arc];
    }

    const places = place.map((place) => PnmlPlace.parseFromObject(place));
    const transitions = transition.map((transition) => PnmlTransition.parseFromObject(transition));
    const arcs = arc.map((arc) => PnmlArc.parseFromObject(arc));

    return new PnmlPage({ id, places, transitions, arcs });
  }
}
