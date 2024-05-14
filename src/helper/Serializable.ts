import { create } from 'xmlbuilder2';
import { ExpandObject, XMLBuilder } from 'xmlbuilder2/lib/interfaces';

export interface ISerializable {
  serialize(): string;
  importChildren(xmlBuilder: XMLBuilder): void;
  getDataForSerialization(): ExpandObject;
  toXmlBuilder(): XMLBuilder;
  getXmlBuilder(node: ExpandObject): XMLBuilder;
  parseFromObject(element: ExpandObject): ISerializable;
  getChildren(): ISerializable[];
}

export abstract class Serializable implements ISerializable {
  parseFromObject(element: ExpandObject): ISerializable {
    throw new Error('Method not implemented.');
  }

  getChildren(): ISerializable[] {
    return [];
  }

  serialize(): string {
    const xmlBuilder = this.toXmlBuilder();
    return xmlBuilder.end({ prettyPrint: true });
  }

  serializeModdle(): string {
    const xmlBuilder = this.toXmlBuilder();
    return xmlBuilder.end({ prettyPrint: true });
  }

  importChildren(xmlBuilder: XMLBuilder): void {
    this.getChildren().forEach((child) => {
      xmlBuilder.import(child.toXmlBuilder());
    });
  }

  getDataForSerialization(): ExpandObject {
    throw new Error('Method not implemented.');
  }

  toXmlBuilder(): XMLBuilder {
    const xmlBuilder = this.getXmlBuilder(this.getDataForSerialization());
    this.importChildren(xmlBuilder);
    return xmlBuilder;
  };

  getXmlBuilder(node: ExpandObject): XMLBuilder {
    const xmlBuilder = create({ version: '1.0', encoding: 'UTF-8' });
    return xmlBuilder.ele(node);
  }

  static parseFromObject(element: ExpandObject): ISerializable {
    throw new Error('Method not implemented.');
  }
}
