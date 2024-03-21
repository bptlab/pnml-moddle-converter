import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { PnmlPosition } from "../types/pnml/PnmlGraphics";
import { PnmlXmlTransition } from "../types/pnml/PnmlXml";
import { IPnmlTransition, IPnmlTransitionData } from "../types/pnml/PnmlTransition";
import Serializable from "../helper/Serializable";

export default class PnmlTransition extends Serializable implements IPnmlTransition {

  id: string;
  label: string | undefined;
  nodePosition: PnmlPosition | undefined;
  labelOffset: PnmlPosition | undefined;

  constructor(data: IPnmlTransitionData) {
    super();
    const { id, label, nodePosition, labelOffset } = data;
    this.id = id;
    this.label = label;
    this.nodePosition = nodePosition;
    this.labelOffset = labelOffset;
  }

  getDataForSerialization(): ExpandObject {
    const transition: PnmlXmlTransition = { "@id": this.id };
    if (this.label != undefined) {
      transition.name = {
        text: this.label,
      };
      if (this.labelOffset !== undefined) {
        transition.name.graphics = {
          offset: {
            "@x": this.labelOffset.x.toString(),
            "@y": this.labelOffset.y.toString(),
          },
        };
      }
    }

    if (this.nodePosition !== undefined) {
      transition.graphics = {
        position: {
          "@x": this.nodePosition.x.toString(),
          "@y": this.nodePosition.y.toString(),
        },
      };
    }

    return { transition };
  }

  static parseFromObject(element: PnmlXmlTransition): PnmlTransition {
    const id = element["@id"];
    const label = element.name?.text;
    const labelOffset = element.name?.graphics?.offset 
      ? { 
        x: parseInt(element.name.graphics.offset["@x"]), 
        y: parseInt(element.name.graphics.offset["@y"]), 
      } 
      : undefined;
    const nodePosition = element.graphics?.position 
      ? { 
        x: parseInt(element.graphics.position["@x"]), 
        y: parseInt(element.graphics.position["@y"]),
      } 
      : undefined;
    return new PnmlTransition({ id, label, nodePosition, labelOffset });
  }
}
