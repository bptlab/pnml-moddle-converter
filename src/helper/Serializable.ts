import { create } from 'xmlbuilder2';
import { ExpandObject, XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import ISerializable from '../types/helper/Serializable';

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

  abstract getDataForSerialization(): ExpandObject;

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
