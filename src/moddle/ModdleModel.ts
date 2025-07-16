import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { ModdlePlace, IModdlePlace } from "./ModdlePlace";
import { ModdleTransition, IModdleTransition } from "./ModdleTransition";
import { ModdleArc, IModdleArc } from "./ModdleArc";
import {
  ModdleXmlArc,
  ModdleXmlModel,
  ModdleXmlPlace,
  ModdleXmlTransition,
} from "./interfaces/ModdleXml";

export interface IModdleModelData {
  id?: string | undefined;
  name?: string | undefined;
  places: IModdlePlace[];
  transitions: IModdleTransition[];
  arcs: IModdleArc[];
}

export interface IModdleModel extends IModdleModelData, ISerializable {}

export class ModdleModel extends Serializable implements IModdleModel {
  id?: string | undefined;
  name?: string | undefined;
  places: IModdlePlace[];
  transitions: IModdleTransition[];
  arcs: IModdleArc[];

  constructor(data: IModdleModelData) {
    super();
    const { id, name, places, transitions, arcs } = data;
    this.id = id;
    this.name = name;
    this.places = places;
    this.transitions = transitions;
    this.arcs = arcs;
  }

  getChildren(): ISerializable[] {
    return [...this.places, ...this.transitions, ...this.arcs];
  }

  getDataForSerialization(): ExpandObject {
    const model: ModdleXmlModel = {
      "@id": this.id,
      "ptn:name": this.name,
    };

    return { "ptn:model": model };
  }

  static parseFromObject(element: ModdleXmlModel): ModdleModel {
    const id =
      element["@id"] ?? (element["@"] ? element["@"]["id"] : undefined);

    let name: string | undefined = undefined;

    if (element["ptn:name"]) {
      name = element["ptn:name"];
    } else if (element["#"] !== undefined) {
      name = element["#"].find((child) => child["ptn:name"] !== undefined)?.[
        "ptn:name"
      ];
    }

    let places: ModdlePlace[] = [];

    if (element["ptn:place"]) {
      if (Array.isArray(element["ptn:place"])) {
        places = element["ptn:place"].map((place) =>
          ModdlePlace.parseFromObject(place)
        );
      } else {
        places = [ModdlePlace.parseFromObject(element["ptn:place"])];
      }
    } else if (element["#"] !== undefined) {
      places = element["#"]
        .filter((child) => child["ptn:place"] !== undefined)
        .flatMap((child) => {
          const place = child["ptn:place"] as ModdleXmlPlace | ModdleXmlPlace[];
          return Array.isArray(place) ? place : [place];
        })
        .map((place) => ModdlePlace.parseFromObject(place));
    }

    let transitions: IModdleTransition[] = [];
    if (element["ptn:transition"]) {
      if (Array.isArray(element["ptn:transition"])) {
        transitions = element["ptn:transition"].map((transition: any) =>
          ModdleTransition.parseFromObject(transition)
        );
      } else {
        transitions = [
          ModdleTransition.parseFromObject(element["ptn:transition"]),
        ];
      }
    } else if (element["#"] !== undefined) {
      transitions = element["#"]
        .filter((child) => child["ptn:transition"] !== undefined)
        .flatMap((child) => {
          const transition = child["ptn:transition"] as
            | ModdleXmlTransition
            | ModdleXmlTransition[];
          return Array.isArray(transition) ? transition : [transition];
        })
        .map((transition) => ModdleTransition.parseFromObject(transition));
    }

    let arcs: IModdleArc[] = [];
    if (element["ptn:arc"]) {
      if (Array.isArray(element["ptn:arc"])) {
        arcs = element["ptn:arc"].map((arc: any) =>
          ModdleArc.parseFromObject(arc)
        );
      } else {
        arcs = [ModdleArc.parseFromObject(element["ptn:arc"])];
      }
    } else if (element["#"] !== undefined) {
      arcs = element["#"]
        .filter((child) => child["ptn:arc"] !== undefined)
        .flatMap((child) => {
          const arc = child["ptn:arc"] as ModdleXmlArc | ModdleXmlArc[];
          return Array.isArray(arc) ? arc : [arc];
        })
        .map((arc) => ModdleArc.parseFromObject(arc));
    }

    return new ModdleModel({ id, name, places, transitions, arcs });
  }
}
