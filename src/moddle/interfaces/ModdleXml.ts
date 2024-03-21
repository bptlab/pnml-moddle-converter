export interface ModdleXmlDefinitions {
  "@xmlns:ptn": "http://bpt-lab.org/schemas/ptn",
  "@xmlns:ptnDi": "http://bpt-lab.org/schemas/ptnDi",
  "@xmlns:dc": "https://www.omg.org/spec/BPMN/20100501/DC.xsd",
  "ptn:ptNet"?: ModdleXmlPTNet | undefined;
  "ptnDi:ptnDiagram"?: ModdleXmlDiagram | undefined;
}

export interface ModdleXmlPTNet {
  "@id": string;
  "@name"?: string | undefined;
  "ptn:place"?: ModdleXmlPlace[] | ModdleXmlPlace | undefined;
  "ptn:transition"?: ModdleXmlTransition[] | ModdleXmlTransition | undefined;
  "ptn:arc"?: ModdleXmlArc[] | ModdleXmlArc | undefined;
}

export interface ModdleXmlPlace {
  "@id": string;
  "@name"?: string | undefined;
  "@marking"?: string | undefined;
}

export interface ModdleXmlTransition {
  "@id": string;
  "@name"?: string | undefined;
}

export interface ModdleXmlArc {
  "@id": string;
  "@source": string;
  "@target": string;
  "@weight"?: string | undefined;
}

export interface ModdleXmlDiagram {
  "@id": string;
  "ptnDi:ptnPlane"?: ModdleXmlPlane | undefined;
}

export interface ModdleXmlPlane {
  "@id": string;
  "@ptNet": string;
  "ptnDi:ptnShape"?: ModdleXmlShape[] | ModdleXmlShape | undefined;
  "ptnDi:ptnEdge"?: ModdleXmlEdge[] | ModdleXmlEdge | undefined;
}

export interface ModdleXmlShape {
  "@id": string;
  "@ptnElement": string;
  "dc:Bounds"?: ModdleXmlBounds | undefined;
  "ptnDi:label"?: ModdleXmlLabel | undefined;
}

export interface ModdleXmlEdge {
  "@id": string;
  "@ptnElement": string;
  "ptnDi:waypoint"?: ModdleXmlWaypoint[] | ModdleXmlWaypoint | undefined;
  "ptnDi:label"?: ModdleXmlLabel | undefined;
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
