import { DataWrapper } from "./DataWrapper";
import { Query } from "./Query/Query";
import { EntityBase } from "../Entity/EntityBase";

export  class ModelBase {
  
  private DataWrapper: DataWrapper = new DataWrapper();
  constructor( private entity: EntityBase) {
    this.initializeDataWrapper()
  }

  async initializeDataWrapper() {
    await this.DataWrapper.defineModel(
      this.entity.attributes,
      this.entity.entityName
    );
    await this.initializeAssociations();
  }

  initializeAssociations() {
    let relations  = this.entity.relations;
    relations.ownMany.forEach(relat =>{
      this.ownMany(relat.entityName , relat.key , relat.as);
    });
    relations.ownOne.forEach(relat =>{
      this.ownOne(relat.entityName , relat.key , relat.as , relat.source );
    });
    relations.relatedTo.forEach(relat =>{
      this.relatedTo(relat.entityName , relat.key , relat.as);
    });
    relations.relatedToMany.forEach(relat =>{
      this.relatedToMany(relat.entityName , relat.key , relat.as);
    });
  }



  /**
   * @description create method
   * at fist it will check for vailditors then
   * if true return success promise
   * else return array of errors
   * @param data
   */

  async create(data: any) {
    let result = await this.DataWrapper.create(data);
    return this.entity.build(result.dataValues);
  }
  async findAll(query?: Query ) {
    let data = await this.DataWrapper.findAll(query);
    
    return data.map(element => {

      return this.entity.build(element.dataValues)
    });
  }
  async findOne(query?: Query) {
    let data = await this.DataWrapper.findOne(query);
    return data ? this.entity.build(data.dataValues) : null;
  }

  async update(data: any, query?: Query) {
    return await this.DataWrapper.update(data, query);
  }
  async delete(query?: Query) {
    return await this.DataWrapper.delete(query);
  }
  async count(query?: Query ) {
    let otherQuery = {...query , paginate : {} }
    // delete query?.paginate;
    let data = await this.DataWrapper.count(<any>otherQuery);
    return data ;
  }
  relatedTo(entityName: string , key: string , relatedAs: string) {
    this.DataWrapper.modelRelatedTo(entityName, key , relatedAs);
  }

  ownMany(entityName: string , key: string , relatedAs: string) {
    this.DataWrapper.modelOwnMany(entityName, key , relatedAs);
  }

  relatedToMany(entityName: string , key: string , relatedAs: string) {
    this.DataWrapper.modelRelatedToMany(entityName, key , relatedAs);
  }

  ownOne(entityName: string , key: string , relatedAs: string , source) {
    this.DataWrapper.modelOwnOne(entityName, key , relatedAs , source);
  }
}
