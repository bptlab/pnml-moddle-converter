import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import Serializable from "../helper/Serializable";
import { IModdlePlace, IModdlePlaceData } from "../types/moddle/ModdlePlace";
import { ModdleXmlPlace, ModdleXmlShape } from "../types/moddle/ModdleXml";
import { ModdleBounds } from "../types/moddle/ModdleElement";

export default class ModdlePlace extends Serializable implements IModdlePlace {

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
      "@ptnElement": this.id,
      "dc:Bounds": this.bounds ? {
        "@x": this.bounds.x.toString(),
        "@y": this.bounds.y.toString(),
        "@width": this.bounds.width.toString(),
        "@height": this.bounds.height.toString(),
      } : undefined,
      "ptnDi:label": this.labelBounds ? {
        "dc:Bounds": {
          "@x": this.labelBounds.x.toString(),
          "@y": this.labelBounds.y.toString(),
          "@width": this.labelBounds.width.toString(),
          "@height": this.labelBounds.height.toString(),
        }
      } : undefined,
    }

    return shape;
  }

  getDataForSerialization(): ExpandObject {
    const place: ModdleXmlPlace = { 
      "@id": this.id,
      "@name": this.name,
      "@marking": this.marking.toString(),
    };

    return { "ptn:place": place };
  }

  static parseFromObject(element: ModdleXmlPlace): ModdlePlace {
    const id = element["@id"];
    const name = element["@name"];
    const marking = parseInt(element["@marking"] ?? "0");
    
    return new ModdlePlace({ id, name, marking });
  }

  parseFromShape(shape: ModdleXmlShape): void {
    const bounds = shape["dc:Bounds"];
    const label = shape["ptnDi:label"];
    this.bounds = (bounds ? {
      x: parseInt(bounds["@x"]),
      y: parseInt(bounds["@y"]),
      width: parseInt(bounds["@width"]),
      height: parseInt(bounds["@height"]),
    } : undefined);
    this.labelBounds = (label ? {
      x: parseInt(label["dc:Bounds"]["@x"]),
      y: parseInt(label["dc:Bounds"]["@y"]),
      width: parseInt(label["dc:Bounds"]["@width"]),
      height: parseInt(label["dc:Bounds"]["@height"]),
    } : undefined);
  }
}
