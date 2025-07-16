"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPnmlToModdle = convertPnmlToModdle;
exports.convertPnmlXmlToModdleXml = convertPnmlXmlToModdleXml;
const ModdleArc_1 = require("../moddle/ModdleArc");
const ModdleDefinitions_1 = require("../moddle/ModdleDefinitions");
const ModdleModel_1 = require("../moddle/ModdleModel");
const ModdlePlace_1 = require("../moddle/ModdlePlace");
const ModdleTransition_1 = require("../moddle/ModdleTransition");
const pnmlParser_1 = require("../parser/pnmlParser");
const placeWidth = 50;
const placeHeight = 50;
const transitionWidth = 50;
const transitionHeight = 50;
const labelWidth = 50;
const labelHeight = 30;
function convertPnmlToModdle(pnmlDocument) {
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
    const places = page.places.map((place) => {
        var _a;
        return new ModdlePlace_1.ModdlePlace({
            id: place.id,
            name: place.label,
            marking: (_a = place.initialMarking) !== null && _a !== void 0 ? _a : 0,
            bounds: place.nodePosition
                ? {
                    x: place.nodePosition.x,
                    y: place.nodePosition.y,
                    width: placeWidth,
                    height: placeHeight,
                }
                : undefined,
            labelBounds: place.labelOffset && place.nodePosition
                ? {
                    x: place.nodePosition.x - place.labelOffset.x,
                    y: place.nodePosition.y - place.labelOffset.y,
                    width: labelWidth,
                    height: labelHeight,
                }
                : undefined,
        });
    });
    const transitions = page.transitions.map((transition) => new ModdleTransition_1.ModdleTransition({
        id: transition.id,
        name: transition.label,
        bounds: transition.nodePosition
            ? {
                x: transition.nodePosition.x,
                y: transition.nodePosition.y,
                width: transitionWidth,
                height: transitionHeight,
            }
            : undefined,
        labelBounds: transition.labelOffset && transition.nodePosition
            ? {
                x: transition.nodePosition.x - transition.labelOffset.x,
                y: transition.nodePosition.y - transition.labelOffset.y,
                width: labelWidth,
                height: labelHeight,
            }
            : undefined,
    }));
    const arcs = page.arcs.map((arc) => {
        // Find the source and target nodes
        const nodes = [...places, ...transitions];
        const source = nodes.find((node) => node.id === arc.source);
        const target = nodes.find((node) => node.id === arc.target);
        // Initialize waypoints and label position
        let sourceWaypoint = { x: 0, y: 0 };
        let targetWaypoint = { x: 0, y: 0 };
        if (source && target && source.bounds && target.bounds) {
            const { x: sourceX, y: sourceY, width: sourceW, height: sourceH, } = source.bounds;
            const { x: targetX, y: targetY, width: targetW, height: targetH, } = target.bounds;
            // Determine if source and target are horizontally or vertically aligned
            const sourceIsLeft = sourceX + sourceW < targetX;
            const sourceIsRight = sourceX > targetX + targetW;
            const horizontallyAligned = !sourceIsLeft && !sourceIsRight;
            const sourceIsOver = sourceY + sourceH < targetY;
            const sourceIsUnder = sourceY > targetY + targetH;
            const verticallyAligned = !sourceIsOver && !sourceIsUnder;
            // Check if the source or target is a place or transition
            const sourceIsPlace = source instanceof ModdlePlace_1.ModdlePlace;
            const targetIsPlace = target instanceof ModdlePlace_1.ModdlePlace;
            // Set width and height defaults
            const sourceWidth = sourceW !== null && sourceW !== void 0 ? sourceW : (sourceIsPlace ? placeWidth : transitionWidth);
            const sourceHeight = sourceH !== null && sourceH !== void 0 ? sourceH : (sourceIsPlace ? placeHeight : transitionHeight);
            const targetWidth = targetW !== null && targetW !== void 0 ? targetW : (targetIsPlace ? placeWidth : transitionWidth);
            const targetHeight = targetH !== null && targetH !== void 0 ? targetH : (targetIsPlace ? placeHeight : transitionHeight);
            const horizontalDistance = Math.abs(sourceX + sourceWidth / 2 - (targetX + targetWidth / 2));
            const verticalDistance = Math.abs(sourceY + sourceHeight / 2 - (targetY + targetHeight / 2));
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
            }
            else {
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
        return new ModdleArc_1.ModdleArc({
            id: arc.id,
            source: arc.source,
            target: arc.target,
            inscription: arc.inscription,
            waypoints: [sourceWaypoint, targetWaypoint],
        });
    });
    const model = new ModdleModel_1.ModdleModel({
        id: pnmlDocument.nets[0].id,
        name: pnmlNet.name,
        places,
        transitions,
        arcs,
    });
    const definitions = new ModdleDefinitions_1.ModdleDefinitions({ model });
    return definitions;
}
function convertPnmlXmlToModdleXml(pnmlXml) {
    const pnmlDocument = (0, pnmlParser_1.parsePnmlXml)(pnmlXml);
    return convertPnmlToModdle(pnmlDocument).serialize();
}
