import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import {
  ModdleXmlArc,
  ModdleXmlEdge,
  ModdleXmlWaypoint,
} from "./interfaces/ModdleXml";
import { IModdleDiagramNode } from "./interfaces/ModdleDiagramNode";
import { ModdleBounds } from "./interfaces/ModdleBounds";
import { ModdlePoint } from "./interfaces/ModdlePoint";

export interface IModdleArcData {
  id: string;
  source: string;
  target: string;
  inscription?: string;
  waypoints?: ModdlePoint[] | undefined;
  labelBounds?: ModdleBounds | undefined;
}

export interface IModdleArc
  extends IModdleArcData,
    IModdleDiagramNode,
    ISerializable {
  getDiagramDataForSerialization(): ModdleXmlEdge;
  parseFromEdge(edge: ModdleXmlEdge): void;
}

export class ModdleArc extends Serializable implements IModdleArc {
  id: string;
  source: string;
  target: string;
  inscription?: string;
  waypoints?: ModdlePoint[];
  labelBounds?: ModdleBounds;

  constructor(data: IModdleArcData) {
    super();
    const { id, inscription, source, target, waypoints, labelBounds } = data;
    this.id = id;
    this.source = source;
    this.target = target;
    this.inscription = inscription;
    this.waypoints = waypoints;
    this.labelBounds = labelBounds;
  }

  getDiagramDataForSerialization(): ModdleXmlEdge {
    const edge: ModdleXmlEdge = {
      "@id": `${this.id}_di`,
      "@modelElement": this.id,
      "ptnDi:waypoint":
        this.waypoints?.map((point) => ({
          "@x": point.x.toString(),
          "@y": point.y.toString(),
        })) ?? [],
      "ptnDi:diagramLabel": this.labelBounds
        ? {
            "dc:Bounds": {
              "@x": this.labelBounds.x.toString(),
              "@y": this.labelBounds.y.toString(),
              "@width": this.labelBounds.width.toString(),
              "@height": this.labelBounds.height.toString(),
            },
          }
        : undefined,
    };

    return edge;
  }

  getDataForSerialization(): ExpandObject {
    const arc: ModdleXmlArc = {
      "@id": this.id,
      "@source": this.source,
      "@target": this.target,
      "ptn:inscription": this.inscription,
    };

    return { "ptn:arc": arc };
  }

  static parseFromObject(element: ModdleXmlArc): ModdleArc {
    const id = element["@id"];
    const source = element["@source"];
    const target = element["@target"];
    const inscription = element["ptn:inscription"];

    return new ModdleArc({ id, source, target, inscription });
  }

  parseFromEdge(edge: ModdleXmlEdge): void {
    let waypoints = edge["ptnDi:waypoint"] ?? [];
    if (!Array.isArray(waypoints)) {
      waypoints = [waypoints];
    }
    const label = edge["ptnDi:diagramLabel"];
    this.waypoints = waypoints.map((waypoint: ModdleXmlWaypoint) => ({
      x: parseInt(waypoint["@x"]),
      y: parseInt(waypoint["@y"]),
    }));
    this.labelBounds = label
      ? {
          x: parseInt(label["dc:Bounds"]["@x"]),
          y: parseInt(label["dc:Bounds"]["@y"]),
          width: parseInt(label["dc:Bounds"]["@width"]),
          height: parseInt(label["dc:Bounds"]["@height"]),
        }
      : undefined;
  }
}
