import { create } from "xmlbuilder2";
import { ModdleXmlDefinitions } from "../types/moddle/ModdleXml";
import ModdleDefinitions from "../moddle/ModdleDefinitions";

export function parseModdleXml(xml: string): ModdleDefinitions {
  const parsedXml = ((create(xml).end({ format: 'object' }) as any)['ptn:definitions'] as ModdleXmlDefinitions);
  return ModdleDefinitions.parseFromObject(parsedXml) as ModdleDefinitions;
}
