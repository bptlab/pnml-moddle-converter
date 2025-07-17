import { ModdleArc } from "../moddle/ModdleArc";
import { ModdleDefinitions } from "../moddle/ModdleDefinitions";
import { ModdleModel } from "../moddle/ModdleModel";
import { ModdlePlace } from "../moddle/ModdlePlace";
import { ModdleTransition } from "../moddle/ModdleTransition";
import { parsePnmlXml } from "../parser/pnmlParser";
import { PnmlDocument } from "../pnml/PnmlDocument";

const placeWidth = 50;
const placeHeight = 50;
const transitionWidth = 50;
const transitionHeight = 50;
const labelWidth = 50;
const labelHeight = 30;

export function convertPnmlToModdle(
  pnmlDocument: PnmlDocument
): ModdleDefinitions {
  if (pnmlDocument.nets.length === 0) {
    throw new Error("No net found in PNML document");
  }

  if (pnmlDocument.nets.length > 1) {
    throw new Error("Multiple nets in one PNML document are not supported");
  }

  const pnmlNet = pnmlDocument.nets[0];

  if (pnmlNet.pages.length === 0) {
    throw new Error("No page found in PNML net");
  }

  if (pnmlNet.pages.length > 1) {
    throw new Error("Multiple pages in one PNML net are not supported");
  }

  const page = pnmlNet.pages[0];

  const places = page.places.map(
    (place) =>
      new ModdlePlace({
        id: place.id,
        name: place.label,
        marking: place.initialMarking ?? 0,
        bounds: {
          x: place.nodePosition ? place.nodePosition.x : 0,
          y: place.nodePosition ? place.nodePosition.y : 0,
          width: placeWidth,
          height: placeHeight,
        },
        labelBounds: place.labelOffset
          ? {
              x: place.nodePosition
                ? place.nodePosition.x - place.labelOffset.x
                : 0,
              y: place.nodePosition
                ? place.nodePosition.y - place.labelOffset.y
                : 0,
              width: labelWidth,
              height: labelHeight,
            }
          : undefined,
      })
  );

  const transitions = page.transitions.map(
    (transition) =>
      new ModdleTransition({
        id: transition.id,
        name: transition.label,
        isSilent: transition.silent ?? false,
        bounds: {
          x: transition.nodePosition ? transition.nodePosition.x : 0,
          y: transition.nodePosition ? transition.nodePosition.y : 0,
          width: transitionWidth,
          height: transitionHeight,
        },
        labelBounds: transition.labelOffset
          ? {
              x: transition.nodePosition
                ? transition.nodePosition.x - transition.labelOffset.x
                : 0,
              y: transition.nodePosition
                ? transition.nodePosition.y - transition.labelOffset.y
                : 0,
              width: labelWidth,
              height: labelHeight,
            }
          : undefined,
      })
  );

  const arcs = page.arcs.map((arc) => {
    // Find the source and target nodes
    const nodes = [...places, ...transitions];
    const source = nodes.find((node) => node.id === arc.source);
    const target = nodes.find((node) => node.id === arc.target);

    // Initialize waypoints and label position
    let sourceWaypoint = { x: 0, y: 0 };
    let targetWaypoint = { x: 0, y: 0 };

    if (source && target && source.bounds && target.bounds) {
      const {
        x: sourceX,
        y: sourceY,
        width: sourceW,
        height: sourceH,
      } = source.bounds;
      const {
        x: targetX,
        y: targetY,
        width: targetW,
        height: targetH,
      } = target.bounds;

      // Determine if source and target are horizontally or vertically aligned
      const sourceIsLeft = sourceX + sourceW < targetX;
      const sourceIsRight = sourceX > targetX + targetW;
      const horizontallyAligned = !sourceIsLeft && !sourceIsRight;
      const sourceIsOver = sourceY + sourceH < targetY;
      const sourceIsUnder = sourceY > targetY + targetH;
      const verticallyAligned = !sourceIsOver && !sourceIsUnder;

      // Check if the source or target is a place or transition
      const sourceIsPlace = source instanceof ModdlePlace;
      const targetIsPlace = target instanceof ModdlePlace;

      // Set width and height defaults
      const sourceWidth =
        sourceW ?? (sourceIsPlace ? placeWidth : transitionWidth);
      const sourceHeight =
        sourceH ?? (sourceIsPlace ? placeHeight : transitionHeight);
      const targetWidth =
        targetW ?? (targetIsPlace ? placeWidth : transitionWidth);
      const targetHeight =
        targetH ?? (targetIsPlace ? placeHeight : transitionHeight);

      const horizontalDistance = Math.abs(
        sourceX + sourceWidth / 2 - (targetX + targetWidth / 2)
      );
      const verticalDistance = Math.abs(
        sourceY + sourceHeight / 2 - (targetY + targetHeight / 2)
      );

      if (horizontalDistance >= verticalDistance) {
        const sourceIsLeft = sourceX + sourceW < targetX;
        sourceWaypoint = {
          x: horizontallyAligned
            ? sourceX + sourceWidth / 2
            : sourceIsLeft
            ? sourceX + sourceWidth
            : sourceX,
          y: sourceY + sourceHeight / 2,
        };

        targetWaypoint = {
          x: horizontallyAligned
            ? targetX + targetWidth / 2
            : sourceIsLeft
            ? targetX
            : targetX + targetWidth,
          y: targetY + targetHeight / 2,
        };
      } else {
        const sourceIsOver = sourceY + sourceH < targetY;
        sourceWaypoint = {
          x: sourceX + sourceWidth / 2,
          y: verticallyAligned
            ? sourceY + sourceHeight / 2
            : sourceIsOver
            ? sourceY + sourceHeight
            : sourceY,
        };

        targetWaypoint = {
          x: targetX + targetWidth / 2,
          y: verticallyAligned
            ? targetY + targetHeight / 2
            : sourceIsOver
            ? targetY
            : targetY + targetHeight,
        };
      }
    }

    // Return the ModdleArc object
    return new ModdleArc({
      id: arc.id,
      source: arc.source,
      target: arc.target,
      inscription: arc.inscription,
      waypoints: [sourceWaypoint, targetWaypoint],
    });
  });

  const model = new ModdleModel({
    id: pnmlDocument.nets[0].id,
    name: pnmlNet.name,
    places,
    transitions,
    arcs,
  });

  const definitions = new ModdleDefinitions({ model });

  return definitions;
}

export function convertPnmlXmlToModdleXml(pnmlXml: string): string {
  const pnmlDocument = parsePnmlXml(pnmlXml);
  return convertPnmlToModdle(pnmlDocument).serialize();
}
