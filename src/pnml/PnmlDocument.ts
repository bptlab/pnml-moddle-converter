import Serializable from "../helper/Serializable";
import { PnmlXmlDocument } from "../types/pnml/PnmlXml";
import { IPnmlNet } from "../types/pnml/PnmlNet";
import { IPnmlDocument, IPnmlDocumentData } from "../types/pnml/PnmlDocument";
import { ExpandObject } from "xmlbuilder2/lib/interfaces";
import PnmlNet from "./PnmlNet";

const nameSpace = "http://www.pnml.org/version-2009/grammar/pnml";

export default class PnmlDocument extends Serializable implements IPnmlDocument {

  nets: IPnmlNet[];

  constructor(data: IPnmlDocumentData) {
    super();
    const { nets } = data;
    this.nets = nets;
    this.children = nets;
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
