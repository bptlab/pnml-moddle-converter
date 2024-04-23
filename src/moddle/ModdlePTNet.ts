import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { ModdlePlace, IModdlePlace } from "./ModdlePlace";
import { ModdleTransition, IModdleTransition } from "./ModdleTransition";
import { ModdleArc, IModdleArc } from "./ModdleArc";
import { ModdleXmlArc, ModdleXmlPTNet, ModdleXmlPlace, ModdleXmlTransition } from "./interfaces/ModdleXml";

export interface IModdlePTNetData {
  id?: string | undefined;
  name?: string | undefined;
  places: IModdlePlace[];
  transitions: IModdleTransition[];
  arcs: IModdleArc[];
}

export interface IModdlePTNet extends IModdlePTNetData, ISerializable {}

export class ModdlePTNet extends Serializable implements IModdlePTNet {

  id?: string | undefined;
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
    const id = element["@id"] ?? (element["@"] ? element["@"]["id"] : undefined);
    const name = element["@name"] ?? (element["@"] ? element["@"]["id"] : undefined);

    let places: ModdlePlace[] = [];

    if (element["ptn:place"]) {
      if (Array.isArray(element["ptn:place"])) {
        places = element["ptn:place"].map(place => ModdlePlace.parseFromObject(place));
      } else {
        places = [ModdlePlace.parseFromObject(element["ptn:place"])];
      }
    } else if (element["#"] !== undefined) {
      places = element["#"]
        .filter(child => child["ptn:place"] !== undefined)
        .flatMap((child) => {
          const place = child["ptn:place"] as ModdleXmlPlace | ModdleXmlPlace[];
          return Array.isArray(place) ? place : [place]
        })
        .map(place => ModdlePlace.parseFromObject(place));
    }

    let transitions: IModdleTransition[] = [];
    if (element["ptn:transition"]) {
      if (Array.isArray(element["ptn:transition"])) {
        transitions = element["ptn:transition"].map((transition: any) => ModdleTransition.parseFromObject(transition));
      } else {
        transitions = [ModdleTransition.parseFromObject(element["ptn:transition"])];
      }
    } else if (element["#"] !== undefined) {
      transitions = element["#"]
        .filter(child => child["ptn:transition"] !== undefined)
        .flatMap((child) => {
          const transition = child["ptn:transition"] as ModdleXmlTransition | ModdleXmlTransition[];
          return Array.isArray(transition) ? transition : [transition]
        })
        .map(transition => ModdleTransition.parseFromObject(transition));
    }

    let arcs: IModdleArc[] = [];
    if (element["ptn:arc"]) {
      if (Array.isArray(element["ptn:arc"])) {
        arcs = element["ptn:arc"].map((arc: any) => ModdleArc.parseFromObject(arc));
      } else {
        arcs = [ModdleArc.parseFromObject(element["ptn:arc"])];
      }
    } else if (element["#"] !== undefined) {
      arcs = element["#"]
        .filter(child => child["ptn:arc"] !== undefined)
        .flatMap((child) => {
          const arc = child["ptn:arc"] as ModdleXmlArc | ModdleXmlArc[];
          return Array.isArray(arc) ? arc : [arc]
        })
        .map(arc => ModdleArc.parseFromObject(arc));
    }

    return new ModdlePTNet({ id, name, places, transitions, arcs });
  }
}
