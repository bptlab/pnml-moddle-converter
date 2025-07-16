export interface ModdleXmlDefinitions {
  "@xmlns:ptn": "http://bpt-lab.org/schemas/ptn";
  "@xmlns:ptnDi": "http://bpt-lab.org/schemas/ptnDi";
  "@xmlns:dc": "https://www.omg.org/spec/BPMN/20100501/DC.xsd";
  "ptn:model"?: ModdleXmlModel | undefined;
  "ptnDi:diagram"?: ModdleXmlDiagram | undefined;
}

export interface ModdleXmlModel {
  "@id"?: string | undefined;
  "ptn:name"?: string;
  "@"?: { id: string; name: string } | undefined;
  "#"?:
    | {
        "ptn:name"?: string;
        "ptn:place"?: ModdleXmlPlace | ModdleXmlPlace[];
        "ptn:transition"?: ModdleXmlTransition | ModdleXmlTransition[];
        "ptn:arc"?: ModdleXmlArc | ModdleXmlArc[];
      }[]
    | undefined;
  "ptn:place"?: ModdleXmlPlace[] | ModdleXmlPlace | undefined;
  "ptn:transition"?: ModdleXmlTransition[] | ModdleXmlTransition | undefined;
  "ptn:arc"?: ModdleXmlArc[] | ModdleXmlArc | undefined;
}

export interface ModdleXmlPlace {
  "@id": string;
  "ptn:name"?: string | undefined;
  "ptn:initialMarking"?: string | undefined;
}

export interface ModdleXmlTransition {
  "@id": string;
  "ptn:name"?: string | undefined;
}

export interface ModdleXmlArc {
  "@id": string;
  "@source": string;
  "@target": string;
  "ptn:inscription"?: string;
}

export interface ModdleXmlDiagram {
  "@id": string;
  "ptnDi:plane"?: ModdleXmlPlane | undefined;
}

export interface ModdleXmlPlane {
  "@id"?: string | undefined;
  "@modelElement"?: string | undefined;
  "@"?: { id: string; modelElement: string } | undefined;
  "ptnDi:diagramShape"?: ModdleXmlShape[] | ModdleXmlShape | undefined;
  "ptnDi:diagramEdge"?: ModdleXmlEdge[] | ModdleXmlEdge | undefined;
  "#"?:
    | {
        "ptnDi:diagramShape"?: ModdleXmlShape | ModdleXmlShape[];
        "ptnDi:diagramEdge"?: ModdleXmlEdge | ModdleXmlEdge[];
      }[]
    | undefined;
}

export interface ModdleXmlShape {
  "@id": string;
  "@modelElement": string;
  "dc:Bounds"?: ModdleXmlBounds | undefined;
  "ptnDi:diagramLabel"?: ModdleXmlLabel | undefined;
}

export interface ModdleXmlEdge {
  "@id": string;
  "@modelElement": string;
  "ptnDi:waypoint"?: ModdleXmlWaypoint[] | ModdleXmlWaypoint | undefined;
  "ptnDi:diagramLabel"?: ModdleXmlLabel | undefined;
}

export interface ModdleXmlWaypoint {
  "@x": string;
  "@y": string;
}

export interface ModdleXmlBounds {
  "@x": string;
  "@y": string;
  "@width": string;
  "@height": string;
}

export interface ModdleXmlLabel {
  "dc:Bounds": ModdleXmlBounds;
}
