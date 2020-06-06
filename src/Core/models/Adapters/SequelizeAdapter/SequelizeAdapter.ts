import { Sequelize, ModelCtor } from "sequelize";

import { SequelizeMapper } from "./SequelizeDataMapper";
import { SequelizeQueryMapper } from "./SequelizeQueryMapper";
import { DataAdapter } from "../../DataAdapter";
import config = require("../../../../database/config/config");
import { DataMapper } from "../../DataTypes/DataMapper";
import { QueryMapper } from "../../Query/QueryMapper";
import { Query } from "../../Query/Query";
export class SequelizeAdapter implements DataAdapter {
  private Sequelize!: Sequelize;
  private static _instance: SequelizeAdapter;
  private relationsHistory: string[] = [];
  typeMapper: DataMapper = new SequelizeMapper();
  queryMapper: QueryMapper = new SequelizeQueryMapper();

  waittingRelation: {
    model: any,
    associatedModel: any,
    key: string,
    relatedAs: string,
    relationType: string,
    source?: any
  }[] = [];

  private constructor() {
    this.Sequelize = new Sequelize(this.initializeSequelize());
  }

  private initializeSequelize(): any {
    return {
      "username": process.env.database_user,
      "password": process.env.database_password,
      "database": process.env.database_name,
      "host": process.env.database_host,
      "dialect": "mysql",
      "operatorsAliases": false
    }
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new SequelizeAdapter();
    }
    return this._instance;
  }

  public defineModel(attributes: any, tableName: string, options?: any) {
    let attrsWithTypes: any = {};
    Object.keys(attributes).forEach(key => {
      attrsWithTypes[key] = this.typeMapper.getType(attributes[key]);
    });
    let definedModel = this.getModel(tableName)
    if (!definedModel) {
      definedModel = this.Sequelize.define(tableName, attrsWithTypes, options);
      this.defineWaittingRelation();
      return definedModel
    }

    return definedModel;
  }

  defineWaittingRelation() {

    for (let i = 0; i < this.waittingRelation.length; i++) {
      let relationType = this.waittingRelation[i].relationType;
      switch (relationType) {
        case 'relatedToMany':
          this.relatedToMany(this.waittingRelation[i].model, this.waittingRelation[i].associatedModel, this.waittingRelation[i].key, this.waittingRelation[i].relatedAs);
          break;

        case 'relatedTo':
          this.relatedTo(this.waittingRelation[i].model, this.waittingRelation[i].associatedModel, this.waittingRelation[i].key, this.waittingRelation[i].relatedAs);
          break;

        case 'ownMany':
          this.ownMany(this.waittingRelation[i].model, this.waittingRelation[i].associatedModel, this.waittingRelation[i].key, this.waittingRelation[i].relatedAs);
          break;

        case 'ownOne':
          this.ownOne(this.waittingRelation[i].model, this.waittingRelation[i].associatedModel, this.waittingRelation[i].key, this.waittingRelation[i].relatedAs, this.waittingRelation[i].source);
          break;

        default:
          break;
      }
      if (this.isRelationDefined(this.waittingRelation[i].model, this.waittingRelation[i].associatedModel, relationType)) {
        delete this.waittingRelation[i];
      }
    }
    return;
  }

  getModel(type: string): any {
    return this.Sequelize.models[type];
  }



  /**
   *
   * @param modelName model name used
   * @param data data to be created
   */
  async create(modelName: any, data: any): Promise<any> {
    return await this.getModel(modelName).create(data);
  }

  /**
   * @param modelName model name used
   * @param query query data
   */
  async findAll(modelName: any, query?: Query): Promise<any> {
    return await this.getModel(modelName).findAll(query);
  }

  async count(modelName: any, query?: Query): Promise<any> {
    return await this.getModel(modelName).count(query);
  }

  /**
   * @param modelName model name used
   * @param query query data
   */
  async findOne(modelName: any, query?: Query): Promise<any> {
    return await this.getModel(modelName).findOne(query);
  }

  /**
   * @param modelName model name used
   * @param query query data
   */
  async update(modelName: any, data: any, query?: Query): Promise<any> {

    return await this.getModel(modelName).update(data, query);
  }

  /**
   * @param modelName model name used
   * @param query query data
   */
  async delete(modelName: any, query?: Query): Promise<any> {
    return await this.getModel(modelName).destroy(query);
  }

  ////////// relations methods ///////////
  defineRelation(model: any, associatedModel: any, relationType: string) {
    //max level of nested
    if (this.waittingRelation.length > 300) {
      throw Error('stack over flow ')
    }
    let record = model + "-" + associatedModel + '-' + relationType;
    this.relationsHistory.push(record);
  }

  isRelationDefined(model: any, associatedModel: any, relationType: string) {
    let record = model + "-" + associatedModel + '-' + relationType;
    if (this.relationsHistory.indexOf(record) > -1) {
      return true;
    }
    return false;
  }
  /**
   *
   * @param model model which add relation to
   * @param associatedModel model which used in this realations
   * @param options
   */
  relatedTo(model: any, associatedModel: any, key: string, relatedAs: string) {
    if (this.isRelationDefined(model, associatedModel, 'relatedTo')) return;
    let associatedObject = this.getModel(associatedModel);
    if (!associatedObject) {
      this.waittingRelation.push({
        model,
        associatedModel,
        key,
        relatedAs,
        relationType: 'relatedTo'
      })
      return;
    }
    this.getModel(model).belongsTo(
      associatedObject,
      {
        foreignKey: key,
        as: relatedAs
      }
    );
    this.defineRelation(model, associatedModel, 'relatedTo');
  }
  /**
   * one to many relation
   * @param model model which add relation to
   * @param associatedModel model which used in this relations
   * @param options
   */
  ownMany(model: any, associatedModel: any, key: string, relatedAs: string) {
    if (this.isRelationDefined(model, associatedModel, 'ownMany')) return;
    let associatedObject = this.getModel(associatedModel);
    if (!associatedObject) {
      this.waittingRelation.push({
        model,
        associatedModel,
        key,
        relatedAs,
        relationType: 'ownMany'
      })
      return;
    }
    this.getModel(model).hasMany(
      associatedObject,
      {
        foreignKey: key,
        as: relatedAs,
      }
    );
    this.defineRelation(model, associatedModel, 'ownMany');
  }
  /**
   * many to many relation
   * @param model model which add relation to
   * @param associatedModel model which used in this relations
   * @param options
   */
  relatedToMany(model: any, associatedModel: any, key: string, relatedAs: string) {
    if (this.isRelationDefined(model, associatedModel, 'relatedToMany')) return;
    let associatedObject = this.getModel(associatedModel);
    if (!associatedObject) {
      this.waittingRelation.push({
        model,
        associatedModel,
        key,
        relatedAs,
        relationType: 'relatedToMany'
      })
      return;
    }
    this.getModel(model).belongsToMany(
      associatedObject,
      {
        through: key,
        as: relatedAs
      }
    );
    this.defineRelation(model, associatedModel, 'relatedToMany');
  }
  /**
   * one to one relation
   * @param model model which add relation to
   * @param associatedModel model which used in this relations
   * @param options
   */
  ownOne(model: any, associatedModel: any, key: string, sourceKey: string, relatedAs: string) {
    if (this.isRelationDefined(model, associatedModel, 'ownOne')) return;
    let associatedObject = this.getModel(associatedModel);
    if (!associatedObject) {
      this.waittingRelation.push({
        model,
        associatedModel,
        key,
        relatedAs,
        relationType: 'ownOne',
        source: sourceKey
      })
      return;
    }
    let relation = {
      foreignKey: key,
      as: relatedAs,

    };
    if (sourceKey) {
      relation['sourceKey'] = sourceKey

    }
    this.getModel(model).hasOne(
      associatedObject,
      relation
    );
    this.defineRelation(model, associatedModel, 'ownOne');
  }


}
