import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import { PnmlNet, IPnmlNet } from "./PnmlNet";
import { Serializable, ISerializable } from "../helper/Serializable";
import { PnmlXmlDocument } from "./interfaces/PnmlXml";

const nameSpace = "http://www.pnml.org/version-2009/grammar/pnml";

export interface IPnmlDocumentData {
  nets: IPnmlNet[];
}

export interface IPnmlDocument extends IPnmlDocumentData, ISerializable {}

export class PnmlDocument extends Serializable implements IPnmlDocument {

  nets: IPnmlNet[];

  constructor(data: IPnmlDocumentData) {
    super();
    const { nets } = data;
    this.nets = nets;
  }

  getChildren(): ISerializable[] {
    return this.nets;
  }

  getDataForSerialization(): ExpandObject {
    const petriNetDocument: PnmlXmlDocument = { "@xmlns": nameSpace };
    return { pnml: petriNetDocument };
  }

  static parseFromObject(element: PnmlXmlDocument): PnmlDocument {
    let { net = [] } = element;
    if (!Array.isArray(net)) {
      net = [net];
    }

    const nets = net.map((net) => PnmlNet.parseFromObject(net));
    return new PnmlDocument({ nets });
  }
}
