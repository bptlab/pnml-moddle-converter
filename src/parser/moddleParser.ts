import { create } from "xmlbuilder2";
import { ModdleDefinitions } from "../moddle/ModdleDefinitions";
import { ModdleXmlDefinitions } from "../moddle/interfaces/ModdleXml";

export function parseModdleXml(xml: string): ModdleDefinitions {
  const parsedXml = ((create(xml).end({ format: 'object' }) as any)['ptn:definitions'] as ModdleXmlDefinitions);
  return ModdleDefinitions.parseFromObject(parsedXml) as ModdleDefinitions;
}
