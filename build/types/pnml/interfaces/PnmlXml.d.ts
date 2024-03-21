export interface PnmlXmlDocument {
    "@xmlns": string;
    net?: PnmlXmlNet | PnmlXmlNet[] | undefined;
}
export interface PnmlXmlTransition {
    "@id": string;
    name?: PnmlXmlTextWithGraphics | undefined;
    graphics?: PnmlXmlGraphics | undefined;
}
export interface PnmlXmlPlace {
    "@id": string;
    name?: PnmlXmlTextWithGraphics | undefined;
    graphics?: PnmlXmlGraphics | undefined;
    initialMarking?: PnmlXmlTextWithGraphics | undefined;
}
export interface PnmlXmlArc {
    "@id": string;
    "@source": string;
    "@target": string;
    inscription?: PnmlXmlText | undefined;
}
export interface PnmlXmlPage {
    "@id": string;
    place?: PnmlXmlPlace | PnmlXmlPlace[] | undefined;
    transition?: PnmlXmlTransition | PnmlXmlTransition[] | undefined;
    arc?: PnmlXmlArc | PnmlXmlArc[] | undefined;
}
export interface PnmlXmlNet {
    "@id": string;
    "@type": string;
    name?: PnmlXmlTextWithGraphics | undefined;
    page?: PnmlXmlPage | PnmlXmlPage[] | undefined;
}
export interface PnmlXmlText {
    text: string;
}
export interface PnmlXmlTextWithGraphics extends PnmlXmlText {
    graphics?: PnmlXmlGraphicsWithOffset | undefined;
}
export interface PnmlXmlGraphics {
    position: PnmlXmlPosition;
}
export interface PnmlXmlPosition {
    "@x": string;
    "@y": string;
}
export interface PnmlXmlGraphicsWithOffset {
    offset: PnmlXmlPosition;
}
