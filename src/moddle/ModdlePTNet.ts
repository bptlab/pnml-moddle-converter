import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { ModdlePlace, IModdlePlace } from "./ModdlePlace";
import { ModdleTransition, IModdleTransition } from "./ModdleTransition";
import { ModdleArc, IModdleArc } from "./ModdleArc";
import { ModdleXmlPTNet } from "./interfaces/ModdleXml";

export interface IModdlePTNetData {
  id: string;
  name?: string | undefined;
  places: IModdlePlace[];
  transitions: IModdleTransition[];
  arcs: IModdleArc[];
}

export interface IModdlePTNet extends IModdlePTNetData, ISerializable {}

export class ModdlePTNet extends Serializable implements IModdlePTNet {

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
