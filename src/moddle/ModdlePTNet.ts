import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import Serializable from "../helper/Serializable";
import { IModdleArc } from "../types/moddle/ModdleArc";
import { IModdlePTNet, IModdlePTNetData } from "../types/moddle/ModdlePTNet";
import { IModdlePlace } from "../types/moddle/ModdlePlace";
import { IModdleTransition } from "../types/moddle/ModdleTransition";
import { ModdleXmlPTNet } from "../types/moddle/ModdleXml";
import ModdlePlace from "./ModdlePlace";
import ModdleTransition from "./ModdleTransition";
import ModdleArc from "./ModdleArc";

export default class ModdlePTNet extends Serializable implements IModdlePTNet {

  id: string;
  name?: string | undefined;
  places: IModdlePlace[];
  transitions: IModdleTransition[];
  arcs: IModdleArc[];

  constructor(data: IModdlePTNetData) {
    super();
    const { id, name, places, transitions, arcs } = data;
    this.id = id;
    this.name = name;
    this.places = places;
    this.transitions = transitions;
    this.arcs = arcs;
    this.children = [...places, ...transitions, ...arcs];
  }

  getDataForSerialization(): ExpandObject {
    const ptNet: ModdleXmlPTNet = {
      "@id": this.id,
      "@name": this.name,
    };

    return { "ptn:ptNet": ptNet };
  }

  static parseFromObject(element: ModdleXmlPTNet): ModdlePTNet {
    const id = element["@id"];
    const name = element["@name"];

    let places: ModdlePlace[] = [];
    if (element["ptn:place"]) {
      if (Array.isArray(element["ptn:place"])) {
        places = element["ptn:place"].map((place: any) => ModdlePlace.parseFromObject(place));
      } else {
        places = [ModdlePlace.parseFromObject(element["ptn:place"])];
      }
    }

    let transitions: IModdleTransition[] = [];
    if (element["ptn:transition"]) {
      if (Array.isArray(element["ptn:transition"])) {
        transitions = element["ptn:transition"].map((transition: any) => ModdleTransition.parseFromObject(transition));
      } else {
        transitions = [ModdleTransition.parseFromObject(element["ptn:transition"])];
      }
    }

    let arcs: IModdleArc[] = [];
    if (element["ptn:arc"]) {
      if (Array.isArray(element["ptn:arc"])) {
        arcs = element["ptn:arc"].map((arc: any) => ModdleArc.parseFromObject(arc));
      } else {
        arcs = [ModdleArc.parseFromObject(element["ptn:arc"])];
      }
    }

    return new ModdlePTNet({ id, name, places, transitions, arcs });
  }
}