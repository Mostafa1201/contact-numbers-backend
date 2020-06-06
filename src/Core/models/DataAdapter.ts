import { Query } from "./Query/Query";
import { DataMapper } from "./DataTypes/DataMapper";
import { QueryMapper } from "./Query/QueryMapper";


export interface DataAdapter {
  typeMapper: DataMapper;
  queryMapper: QueryMapper;


  defineModel(attributes: any, dataname?: string, options?: any): void;
  getModel(name);

  create(modelName: any ,query?: Query) : Promise<any>;
  findAll(modelName: any ,query?: Query) : Promise<any>;
  count(modelName: any ,query?: Query) : Promise<any>;
  findOne(modelName: any ,query?: Query) : Promise<any>;
  update(modelName: any ,data: any, query?: Query) : Promise<any>;
  delete(modelName: any ,query?: Query): Promise<any>;
  
  relatedTo(societeModel: any, associatedModel: any, key: string , relatedAs: string): void;
  ownMany(societeModel: any, associatedModel: any, key: string , relatedAs: string): void;
  relatedToMany(societeModel: any, associatedModel: any, key: string , relatedAs: string): void;
  ownOne(societeModel: any, associatedModel: any, key: string , sourceKey : any , relatedAs: string): void;
}
