import { DataAdapter } from "./DataAdapter";
import { Query } from "./Query/Query";
import { DataAdapterFactory } from "./Adapters/DataAdapterFactory";

export class DataWrapper {
  private dataAdapter: DataAdapter = new DataAdapterFactory().getAdapter();
  private modelName!: string;
  constructor() {}

  /**
   * @description define model using Db Layer
   */
  defineModel(attrbuites: any, typeName?: any) {
    this.modelName = typeName;
    this.dataAdapter.defineModel(attrbuites, typeName);
  }
  /**
   * return model to using in relations
   */

  /**
   * create method from model
   * @param data create data
   */
  async create(data: any) {
    return await this.dataAdapter.create(this.modelName,data);
  }
  /**
   * find all from model
   * @param query query data
   */
  async findAll(query?: Query) {
    let mappedQuery = this.dataAdapter.queryMapper.getQuery(query);
    let result = await this.dataAdapter.findAll(this.modelName,mappedQuery);
    return result;
  }
  /**
   * count from model
   * @param query query data
   */
  async count(query?: Query) {
    let mappedQuery = this.dataAdapter.queryMapper.getQuery(query);
    let result = await this.dataAdapter.findAll(this.modelName,mappedQuery);
    return result.length;
  }
  /**
   * find one from model
   * @param query query data
   */
  async findOne(query?: Query) {
    let mappedQuery = this.dataAdapter.queryMapper.getQuery(query);
    let result = await this.dataAdapter.findOne(this.modelName,mappedQuery);
    return result;
  }
  /**
   * update  model data
   * @param query query data
   */
  async update(data: any, query?: Query) {
    let mappedQuery = this.dataAdapter.queryMapper.getQuery(query);
    let result = await this.dataAdapter.update(this.modelName,data,mappedQuery);
    return result;
  }
  /**
   * delete  model
   * @param query query data
   */
  async delete(query?: Query) {
    let mappedQuery = this.dataAdapter.queryMapper.getQuery(query);
    let result = await this.dataAdapter.delete(this.modelName,mappedQuery);
    return result;
  }
  /**
   * one to one relation
   * @param model
   * @param options
   */
  modelRelatedTo(entityName: string , key: string , relatedAs: string) {
    this.dataAdapter.relatedTo(this.modelName, entityName, key , relatedAs);
  }
  /**
   * one to many relation
   * @param model
   * @param options
   */
  modelOwnMany(entityName: string , key: string , relatedAs: string) {
    this.dataAdapter.ownMany(this.modelName, entityName, key , relatedAs);
  }
  /**
   * many to many relation
   * @param model
   * @param options
   */
  modelRelatedToMany(entityName: string , key: string , relatedAs: string) {
    this.dataAdapter.relatedToMany(this.modelName, entityName, key , relatedAs);
  }
  /**
   * one to one relation
   * @param model
   * @param options
   */
  modelOwnOne(entityName: string , key: string , relatedAs: string , source) {
    this.dataAdapter.ownOne(this.modelName, entityName, key , source , relatedAs);
  }
}
