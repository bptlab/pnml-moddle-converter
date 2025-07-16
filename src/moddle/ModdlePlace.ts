import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { ModdleXmlPlace, ModdleXmlShape } from "./interfaces/ModdleXml";
import { IModdleDiagramNode } from "./interfaces/ModdleDiagramNode";
import { ModdleBounds } from "./interfaces/ModdleBounds";

export interface IModdlePlaceData {
  id: string;
  name?: string | undefined;
  marking: number;
  bounds?: ModdleBounds | undefined;
  labelBounds?: ModdleBounds | undefined;
}

export interface IModdlePlace
  extends IModdlePlaceData,
    IModdleDiagramNode,
    ISerializable {
  getDiagramDataForSerialization(): ModdleXmlShape;
  parseFromShape(shape: ModdleXmlShape): void;
}

export class ModdlePlace extends Serializable implements IModdlePlace {
  id: string;
  name?: string | undefined;
  marking: number;
  bounds?: ModdleBounds | undefined;
  labelBounds?: ModdleBounds | undefined;

  constructor(data: IModdlePlaceData) {
    super();
    const { id, name, marking, bounds, labelBounds } = data;
    this.id = id;
    this.name = name;
    this.marking = marking;
    this.bounds = bounds;
    this.labelBounds = labelBounds;
  }

  getDiagramDataForSerialization(): ModdleXmlShape {
    const shape: ModdleXmlShape = {
      "@id": `${this.id}_di`,
      "@modelElement": this.id,
      "dc:Bounds": this.bounds
        ? {
            "@x": this.bounds.x.toString(),
            "@y": this.bounds.y.toString(),
            "@width": this.bounds.width.toString(),
            "@height": this.bounds.height.toString(),
          }
        : undefined,
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

    return shape;
  }

  getDataForSerialization(): ExpandObject {
    const place: ModdleXmlPlace = {
      "@id": this.id,
      "ptn:name": this.name,
      "ptn:initialMarking": this.marking.toString(),
    };

    return { "ptn:place": place };
  }

  static parseFromObject(element: ModdleXmlPlace): ModdlePlace {
    const id = element["@id"];
    const name = element["ptn:name"];
    const marking = parseInt(element["ptn:initialMarking"] ?? "0");

    return new ModdlePlace({ id, name, marking });
  }

  parseFromShape(shape: ModdleXmlShape): void {
    const bounds = shape["dc:Bounds"];
    const label = shape["ptnDi:diagramLabel"];
    this.bounds = bounds
      ? {
          x: parseInt(bounds["@x"]),
          y: parseInt(bounds["@y"]),
          width: parseInt(bounds["@width"]),
          height: parseInt(bounds["@height"]),
        }
      : undefined;
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
