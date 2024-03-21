import { create } from 'xmlbuilder2';
import { ExpandObject, XMLBuilder } from 'xmlbuilder2/lib/interfaces';

export default interface ISerializable {
  children: ISerializable[];
  serialize(): string;
  importChildren(xmlBuilder: XMLBuilder): void;
  getDataForSerialization(): ExpandObject;
  toXmlBuilder(): XMLBuilder;
  getXmlBuilder(node: ExpandObject): XMLBuilder;
  parseFromObject(element: ExpandObject): ISerializable;
}

export default abstract class Serializable implements ISerializable {
  parseFromObject(element: ExpandObject): ISerializable {
    throw new Error('Method not implemented.');
  }

  children: ISerializable[] = [];

  serialize(): string {
    const xmlBuilder = this.toXmlBuilder();
    return xmlBuilder.end({ prettyPrint: true });
  }

  serializeModdle(): string {
    const xmlBuilder = this.toXmlBuilder();
    return xmlBuilder.end({ prettyPrint: true });
  }

  importChildren(xmlBuilder: XMLBuilder): void {
    this.children.forEach((child) => {
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
