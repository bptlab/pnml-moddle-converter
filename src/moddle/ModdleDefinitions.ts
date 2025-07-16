import { ExpandObject, XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { Serializable, ISerializable } from "../helper/Serializable";
import {
  ModdleXmlDefinitions,
  ModdleXmlDiagram,
  ModdleXmlEdge,
  ModdleXmlShape,
} from "./interfaces/ModdleXml";
import { ModdleModel, IModdleModel } from "./ModdleModel";

export interface IModdleDefinitionsData {
  model: IModdleModel;
}

export interface IModdleDefinitions
  extends IModdleDefinitionsData,
    ISerializable {}

export class ModdleDefinitions
  extends Serializable
  implements IModdleDefinitions
{
  model: IModdleModel;

  constructor(data: IModdleDefinitionsData) {
    super();
    const { model } = data;
    this.model = model;
  }

  getChildren(): ISerializable[] {
    return [this.model];
  }

  getDataForSerialization(): ExpandObject {
    const definitions: ModdleXmlDefinitions = {
      "@xmlns:ptn": "http://bpt-lab.org/schemas/ptn",
      "@xmlns:ptnDi": "http://bpt-lab.org/schemas/ptnDi",
      "@xmlns:dc": "https://www.omg.org/spec/BPMN/20100501/DC.xsd",
    };

    return { "ptn:definitions": definitions };
  }

  /**
   * Definitions specifies the elements as well as graphical information of the model.
   * Since the graphical information is stored in the children of the Model, this method
   * is overwritten to append the graphical information to the XMLBuilder.
   * @returns XMLBuilder with diagram data
   */
  toXmlBuilder(): XMLBuilder {
    const xmlBuilder = super.toXmlBuilder();

    const diagram: ModdleXmlDiagram = {
      "@id": `${this.model.id}_di`,
      "ptnDi:plane": {
        "@id": `${this.model.id}_plane`,
        "@modelElement": this.model.id,
        "ptnDi:diagramShape": [
          ...this.model.places.map((place) =>
            place.getDiagramDataForSerialization()
          ),
          ...this.model.transitions.map((transition) =>
            transition.getDiagramDataForSerialization()
          ),
        ],
        "ptnDi:diagramEdge": this.model.arcs.map((arc) =>
          arc.getDiagramDataForSerialization()
        ),
      },
    };

    const diagramBuilder = this.getXmlBuilder({ "ptnDi:diagram": diagram });
    xmlBuilder.import(diagramBuilder);
    return xmlBuilder;
  }

  static parseFromObject(element: ModdleXmlDefinitions): ModdleDefinitions {
    const model = element["ptn:model"];
    if (!model) throw new Error("No Model found in Definitions");
    const definitions = new ModdleDefinitions({
      model: ModdleModel.parseFromObject(model),
    });

    const diagram = element["ptnDi:diagram"];
    if (diagram && diagram["ptnDi:plane"]) {
      const plane = diagram["ptnDi:plane"];
      let shapes =
        plane["ptnDi:diagramShape"] ??
        (plane["#"]
          ? plane["#"]
              .filter((shape) => shape["ptnDi:diagramShape"] !== undefined)
              .flatMap((shape) =>
                Array.isArray(shape["ptnDi:diagramShape"])
                  ? shape["ptnDi:diagramShape"]
                  : [shape["ptnDi:diagramShape"]]
              )
          : []);
      if (!Array.isArray(shapes)) {
        shapes = [shapes];
      }
      const shapeArray = shapes as ModdleXmlShape[];

      let edges =
        plane["ptnDi:diagramEdge"] ??
        (plane["#"]
          ? plane["#"]
              .filter((edge) => edge["ptnDi:diagramEdge"] !== undefined)
              .flatMap((edge) =>
                Array.isArray(edge["ptnDi:diagramEdge"])
                  ? edge["ptnDi:diagramEdge"]
                  : [edge["ptnDi:diagramEdge"]]
              )
          : []);
      if (!Array.isArray(edges)) {
        edges = [edges];
      }
      const edgeArray = edges as ModdleXmlEdge[];

      const { places, transitions, arcs } = definitions.model;

      places.forEach((place) => {
        const shape = shapeArray.find(
          (shape) => shape["@modelElement"] === place.id
        );
        if (shape) {
          place.parseFromShape(shape);
        }
      });

      transitions.forEach((transition) => {
        const shape = shapeArray.find(
          (shape) => shape["@modelElement"] === transition.id
        );
        if (shape) {
          transition.parseFromShape(shape);
        }
      });

      arcs.forEach((arc) => {
        const edge = edgeArray.find((edge) => edge["@modelElement"] === arc.id);
        if (edge) {
          arc.parseFromEdge(edge);
        }
      });
    }

    return definitions;
  }
}
