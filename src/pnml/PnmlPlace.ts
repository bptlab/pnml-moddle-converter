import { IPnmlPlace, IPnmlPlaceData } from "../types/pnml/PnmlPlace";
import Serializable from "../helper/Serializable";
import { PnmlPosition } from "../types/pnml/PnmlGraphics";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { PnmlXmlPlace } from "../types/pnml/PnmlXml";

export default class PnmlPlace extends Serializable implements IPnmlPlace {

  id: string;
  label: string | undefined;
  initialMarking: number | undefined;
  nodePosition: PnmlPosition | undefined;
  labelOffset: PnmlPosition | undefined;
  initialMarkingOffset: PnmlPosition | undefined;

  constructor(data: IPnmlPlaceData) {
    super();
    const { id, label, initialMarking, nodePosition, labelOffset, initialMarkingOffset } = data;
    this.id = id;
    this.label = label;
    this.initialMarking = initialMarking;
    this.nodePosition = nodePosition;
    this.labelOffset = labelOffset;
    this.initialMarkingOffset = initialMarkingOffset;
  }

  getDataForSerialization(): ExpandObject {

    const place: PnmlXmlPlace = { "@id": this.id };

    if (this.label != undefined) {
      place.name = {
        text: this.label,
      };
      if (this.labelOffset !== undefined) {
        place.name.graphics = {
          offset: {
            "@x": this.labelOffset.x.toString(),
            "@y": this.labelOffset.y.toString(),
          },
        };
      }
    }

    if (this.nodePosition !== undefined) {
      place.graphics = {
        position: {
          "@x": this.nodePosition.x.toString(),
          "@y": this.nodePosition.y.toString(),
        },
      };
    }

    if (this.initialMarking !== undefined) {
      place.initialMarking = {
        text: this.initialMarking.toString(),
      };
      if (this.initialMarkingOffset !== undefined) {
        place.initialMarking.graphics = {
          offset: {
            "@x": this.initialMarkingOffset.x.toString(),
            "@y": this.initialMarkingOffset.y.toString(),
          },
        };
      }
    }

    return { place };
  }

  static parseFromObject(element: PnmlXmlPlace): PnmlPlace {
    const id = element["@id"];
    const label = element.name?.text;
    const initialMarking = element.initialMarking?.text ? parseInt(element.initialMarking.text) : undefined;
    const labelOffset = element.name?.graphics?.offset 
      ? { 
        x: parseInt(element.name.graphics.offset["@x"]), 
        y: parseInt(element.name.graphics.offset["@y"]), 
      } : undefined;
    const nodePosition = element.graphics?.position ? { 
      x: parseInt(element.graphics.position["@x"]), 
      y: parseInt(element.graphics.position["@y"]), 
    } : undefined;
    const initialMarkingOffset = element.initialMarking?.graphics?.offset 
      ? { 
        x: parseInt(element.initialMarking.graphics.offset["@x"]), 
        y: parseInt(element.initialMarking.graphics.offset["@y"]), 
      } : undefined;
    return new PnmlPlace({ id, label, initialMarking, nodePosition, labelOffset, initialMarkingOffset });
  }
}
