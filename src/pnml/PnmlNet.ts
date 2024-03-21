import Serializable from "../helper/Serializable";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import PnmlPage, { IPnmlPage } from "./PnmlPage";
import ISerializable from "../helper/Serializable";
import { PnmlXmlNet } from "./interfaces/PnmlXml";

export enum PnmlNetType {
  PtNet = "http://www.pnml.org/version-2009/grammar/ptnet"
}

export interface IPnmlNetData {
  id: string;
  type: string;
  pages: IPnmlPage[];
  name?: string | undefined;
}

export interface IPnmlNet extends IPnmlNetData, ISerializable {}

export default class PnmlNet extends Serializable implements IPnmlNet {
  id: string;
  type: string;
  pages: IPnmlPage[];
  name?: string | undefined;

  constructor(data: IPnmlNetData) {
    super();
    const { id, type, name, pages = [] } = data;
    this.id = id;
    this.type = type.toString();
    this.pages = pages;
    this.name = name;
    this.children = pages;
  }

  getDataForSerialization(): ExpandObject {
    const net: PnmlXmlNet = { "@id": this.id, "@type": this.type };

    if (this.name != undefined) {
      net.name = {
        text: this.name,
      };
    }

    return { net };
  }

  static parseFromObject(element: PnmlXmlNet): IPnmlNet {
    const id = element["@id"];
    const type = element["@type"];
    const name = typeof element.name?.text === "string" ? element.name?.text : undefined;
    let { page = [] } = element;
    if (!Array.isArray(page)) {
      page = [page];
    }

    const pages = page.map((page) => PnmlPage.parseFromObject(page));

    return new PnmlNet({ id, type, name, pages });
  }
}
