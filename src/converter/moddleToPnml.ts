import ModdleDefinitions from "../moddle/ModdleDefinitions";
import { parseModdleXml } from "../parser/moddleParser";
import PnmlArc from "../pnml/PnmlArc";
import PnmlDocument from "../pnml/PnmlDocument";
import PnmlNet, { PnmlNetType } from "../pnml/PnmlNet";
import PnmlPage from "../pnml/PnmlPage";
import PnmlPlace from "../pnml/PnmlPlace";
import PnmlTransition from "../pnml/PnmlTransition";

const initialMarkingOffset = { x: 22, y: 20 };

export function convertModdleToPnml(moddleDefinitions: ModdleDefinitions): PnmlDocument {

  const places = moddleDefinitions.ptNet.places.map((place) => (new PnmlPlace({
    id: place.id,
    label: place.name,
    initialMarking: place.marking > 0 ? place.marking : undefined,
    nodePosition: place.bounds ? {
      x: place.bounds.x,
      y: place.bounds.y
    } : undefined,
    labelOffset: place.bounds && place.labelBounds ? {
      x: place.bounds.x - place.labelBounds.x,
      y: place.bounds.y - place.labelBounds.y,
    } : undefined,
    initialMarkingOffset: place.marking > 0 ? initialMarkingOffset : undefined
  })));

  const transitions = moddleDefinitions.ptNet.transitions.map((transition) => (new PnmlTransition({
    id: transition.id,
    label: transition.name,
    nodePosition: transition.bounds ? {
      x: transition.bounds.x,
      y: transition.bounds.y
    } : undefined,
    labelOffset: transition.bounds && transition.labelBounds ? {
      x: transition.bounds.x - transition.labelBounds.x,
      y: transition.bounds.y - transition.labelBounds.y,
    } : undefined,
  })));

  const arcs = moddleDefinitions.ptNet.arcs.map((arc) => (new PnmlArc({
    id: arc.id,
    source: arc.source,
    target: arc.target,
    weight: arc.weight,
  })));

  const page = new PnmlPage({
    id: 'ptnet_page_1',
    places,
    transitions,
    arcs
  });

  const net = new PnmlNet({
    id: moddleDefinitions.ptNet.id,
    name: moddleDefinitions.ptNet.name,
    type: PnmlNetType.PtNet,
    pages: [page],
  });

  const pnmlDocument = new PnmlDocument({
    nets: [net]
  });

  return pnmlDocument;
}

export function convertModdleXmlToPnmlXml(moddleXml: string): string {
  const moddleDefinitions = parseModdleXml(moddleXml);
  return convertModdleToPnml(moddleDefinitions).serialize();
}
