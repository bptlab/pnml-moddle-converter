import Serializable from "../helper/Serializable";
import { PnmlXmlPage } from "../types/pnml/PnmlXml";
import { IPnmlArc } from "../types/pnml/PnmlArc";
import { IPnmlTransition } from "../types/pnml/PnmlTransition";
import { IPnmlPlace } from "../types/pnml/PnmlPlace";
import { IPnmlPage, IPnmlPageData } from "../types/pnml/PnmlPage";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import PnmlPlace from "./PnmlPlace";
import PnmlTransition from "./PnmlTransition";
import PnmlArc from "./PnmlArc";

export default class PnmlPage extends Serializable implements IPnmlPage {

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
    this.children = [...places, ...transitions, ...arcs]
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
