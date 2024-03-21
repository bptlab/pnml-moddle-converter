import { create } from "xmlbuilder2";
import PnmlDocument from "../pnml/PnmlDocument";
import { PnmlXmlDocument } from "../pnml/interfaces/PnmlXml";

export function parsePnmlXml(xml: string): PnmlDocument {
  const parsedXml = ((create(xml).end({ format: 'object' }) as any).pnml as PnmlXmlDocument);
  return PnmlDocument.parseFromObject(parsedXml) as PnmlDocument;
}
