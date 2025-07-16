import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { ModdleXmlShape, ModdleXmlTransition } from "./interfaces/ModdleXml";
import { ModdleBounds } from "./interfaces/ModdleBounds";
import { IModdleDiagramNode } from "./interfaces/ModdleDiagramNode";

export interface IModdleTransitionData {
  id: string;
  name?: string | undefined;
  bounds?: ModdleBounds | undefined;
  labelBounds?: ModdleBounds | undefined;
}

export interface IModdleTransition
  extends IModdleTransitionData,
    IModdleDiagramNode,
    ISerializable {
  getDiagramDataForSerialization(): ModdleXmlShape;
  parseFromShape(shape: ModdleXmlShape): void;
}

export class ModdleTransition
  extends Serializable
  implements IModdleTransition
{
  id: string;
  name?: string | undefined;
  bounds?: ModdleBounds | undefined;
  labelBounds?: ModdleBounds | undefined;

  constructor(data: IModdleTransitionData) {
    super();
    const { id, name, bounds, labelBounds } = data;
    this.id = id;
    this.name = name;
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
    const transition: ExpandObject = {
      "@id": this.id,
      "ptn:name": this.name,
    };

    return { "ptn:transition": transition };
  }

  static parseFromObject(element: ModdleXmlTransition): ModdleTransition {
    const id = element["@id"];
    const name = element["ptn:name"];

    return new ModdleTransition({ id, name });
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
