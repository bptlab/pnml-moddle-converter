import { ModdleArc } from "../moddle/ModdleArc";
import { ModdleDefinitions } from "../moddle/ModdleDefinitions";
import { ModdlePTNet } from "../moddle/ModdlePTNet";
import { ModdlePlace } from "../moddle/ModdlePlace";
import { ModdleTransition } from "../moddle/ModdleTransition";
import { parsePnmlXml } from "../parser/pnmlParser";
import { PnmlDocument } from "../pnml/PnmlDocument";

const placeWidth = 30;
const placeHeight = 30;
const transitionWidth = 30;
const transitionHeight = 50;
const labelWidth = 30;
const labelHeight = 30;

export function convertPnmlToModdle(pnmlDocument: PnmlDocument): ModdleDefinitions {

  if (pnmlDocument.nets.length === 0) {
    throw new Error('No net found in PNML document');
  }

  if (pnmlDocument.nets.length > 1) {
    throw new Error('Multiple nets in one PNML document are not supported');
  }

  const pnmlNet = pnmlDocument.nets[0];

  if (pnmlNet.pages.length === 0) {
    throw new Error('No page found in PNML net');
  }

  if (pnmlNet.pages.length > 1) {
    throw new Error('Multiple pages in one PNML net are not supported');
  }

  const page = pnmlNet.pages[0];

  const places = page.places.map((place) => (new ModdlePlace({
    id: place.id,
    name: place.label,
    marking: place.initialMarking ?? 0,
    bounds: place.nodePosition ? {
      x: place.nodePosition.x,
      y: place.nodePosition.y,
      width: placeWidth,
      height: placeHeight,
    } : undefined,
    labelBounds: place.labelOffset && place.nodePosition ? {
      x: place.nodePosition.x - place.labelOffset.x,
      y: place.nodePosition.y - place.labelOffset.y,
      width: labelWidth,
      height: labelHeight,
    } : undefined,
  })));

  const transitions = page.transitions.map((transition) => (new ModdleTransition({
    id: transition.id,
    name: transition.label,
    bounds: transition.nodePosition ? {
      x: transition.nodePosition.x,
      y: transition.nodePosition.y,
      width: transitionWidth,
      height: transitionHeight,
    } : undefined,
    labelBounds: transition.labelOffset && transition.nodePosition ? {
      x: transition.nodePosition.x - transition.labelOffset.x,
      y: transition.nodePosition.y - transition.labelOffset.y,
      width: labelWidth,
      height: labelHeight,
    } : undefined,
  })));

  const arcs = page.arcs.map((arc) => {

    const source = [...places, ...transitions].find((node) => node.id === arc.source);
    const target = [...places, ...transitions].find((node) => node.id === arc.target);

    let sourceWaypoint = { x: 0, y: 0 };
    let targetWaypoint = { x: 0, y: 0 };
    let labelX = 0;
    let labelY = 0;

    if (source && target && source.bounds && target.bounds) {
      const sourceIsLeft = source.bounds.x < target.bounds.x;
      const sourceIsOver = source.bounds.y < target.bounds.y;

      const sourceHorizontalOffset = Math.round((source instanceof ModdlePlace ? placeWidth : transitionWidth) / 2);
      const sourceVerticalOffset = Math.round((source instanceof ModdlePlace ? placeHeight : transitionHeight) / 2);
      const targetHorizontalOffset = Math.round((target instanceof ModdlePlace ? placeWidth : transitionWidth) / 2);
      const targetVerticalOffset = Math.round((target instanceof ModdlePlace ? placeHeight : transitionHeight) / 2);

      sourceWaypoint = {
        x: sourceIsLeft 
          ? source.bounds.x + sourceHorizontalOffset 
          : source.bounds.x - sourceHorizontalOffset,
        y: sourceIsOver 
          ? source.bounds.y + sourceVerticalOffset 
          : source.bounds.y - sourceVerticalOffset,
      };
      targetWaypoint = {
        x: sourceIsLeft 
          ? target.bounds.x - targetHorizontalOffset 
          : target.bounds.x + targetHorizontalOffset,
        y: sourceIsOver 
          ? target.bounds.y - targetVerticalOffset 
          : target.bounds.y + targetVerticalOffset,
      };

      labelX = Math.round(sourceIsLeft 
        ? sourceWaypoint.x + (targetWaypoint.x - sourceWaypoint.x) / 2 
        : targetWaypoint.x + (sourceWaypoint.x - targetWaypoint.x) / 2);
      labelY = Math.round(sourceIsOver 
        ? sourceWaypoint.y + (targetWaypoint.y - sourceWaypoint.y) / 2 
        : targetWaypoint.y + (sourceWaypoint.y - targetWaypoint.y) / 2);
    }

    const moddleArc = new ModdleArc({
      id: arc.id,
      source: arc.source,
      target: arc.target,
      weight: arc.weight,
      waypoints: [sourceWaypoint, targetWaypoint],
      labelBounds: {
        x: labelX,
        y: labelY,
        width: labelWidth,
        height: labelHeight,
      },
    });
    return moddleArc;
  });

  const ptNet = new ModdlePTNet({
    id: pnmlDocument.nets[0].id,
    name: pnmlNet.name,
    places,
    transitions,
    arcs,
  });

  const definitions = new ModdleDefinitions({ ptNet });

  return definitions;
}

export function convertPnmlXmlToModdleXml(pnmlXml: string): string {
  const pnmlDocument = parsePnmlXml(pnmlXml);
  return convertPnmlToModdle(pnmlDocument).serialize();
}
