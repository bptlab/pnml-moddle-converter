import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import { PnmlPosition } from "./interfaces/PnmlPosition";
import { PnmlXmlTransition } from "./interfaces/PnmlXml";

export interface IPnmlTransitionData {
  id: string;
  label?: string | undefined;
  nodePosition?: PnmlPosition | undefined;
  labelOffset?: PnmlPosition | undefined;
  silent?: boolean | undefined;
}

export interface IPnmlTransition extends IPnmlTransitionData, ISerializable {}

export class PnmlTransition extends Serializable implements IPnmlTransition {
  id: string;
  label: string | undefined;
  nodePosition: PnmlPosition | undefined;
  labelOffset: PnmlPosition | undefined;
  silent: boolean | undefined;

  constructor(data: IPnmlTransitionData) {
    super();
    const { id, label, nodePosition, labelOffset, silent } = data;
    this.id = id;
    this.label = label;
    this.nodePosition = nodePosition;
    this.labelOffset = labelOffset;
    this.silent = silent;
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

    transition.silent = this.silent ? "true" : undefined;

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
    const silent = element.silent === "true" ? true : undefined;
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
    return new PnmlTransition({ id, label, nodePosition, labelOffset, silent });
  }
}
