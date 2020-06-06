import Sequelize from "sequelize";
import { QueryMapper } from "../../Query/QueryMapper";
import { Query, IncludeQuery } from "../../Query/Query";
import { SequelizeAdapter } from "./SequelizeAdapter";
const Op = Sequelize.Op;
export class SequelizeQueryMapper extends QueryMapper {
  sequlizeQuery  = { where : {} , include : [{}] , order : [[]]};
  subQuery = {};
  includeQuery = {};
  private query;
  getQuery(query?: Query): any {
    if (query) {
      this.query = query;
      this.sequlizeQuery = { where : {} , include : [] , order :[]};
      Object.keys(query).forEach(key => {

        this.sequlizeQuery.where = { ...this.sequlizeQuery.where, ...this.mapOperator(key , query[key]) };

      });

      if (query.selectedAttribute) {
        this.sequlizeQuery["attributes"] = query.selectedAttribute;
      }

      if (query.paginate) {
        this.sequlizeQuery = {
          ...this.sequlizeQuery,
          ...this.getPaginateQuery(query.paginate)
        };
      }

      if (query.with){
        this.sequlizeQuery = {
          ...this.sequlizeQuery,
          include : this.includeMapper(query.with)
        };
      }

      if (query.sort){
        this.sequlizeQuery = {
          ...this.sequlizeQuery,
          order : this.sortMapper(query.sort)
        };
      }
      
      return this.sequlizeQuery;
    }

    return;
  }

  includeMapper(includes : IncludeQuery[] = []) : Object[]{
    let include : Object[] = [];
    let seqAdapter = SequelizeAdapter.instance;
    for(let ele of includes){
      let includeQuery = {
        model : seqAdapter.getModel(ele.modelName),
        subQuery : false,
        required : false
      };
      // query not work if the following properies equal null or empty object 
      if(ele.includeAs) includeQuery['as'] = ele.includeAs ;
      if(ele.query) includeQuery['where'] = this.getIncludeQuery(ele.query) ;
      if(ele.includeWith && ele.includeWith.length > 0 ) includeQuery['include'] = this.includeMapper(ele.includeWith) ;
      include.push(includeQuery);
    }

    return include;
  }

  mapOperator(key : string , query : any , isParent = true){
    let equalToQuery = {};
    if (key == "equalTo") {
      equalToQuery = this.getEqualToQuery(query , isParent);
    }

    if (key == "notEqualTo") {
      equalToQuery = this.getNotEqualToQuery(query , isParent);
    }

    if (key == "moreThan") {
      equalToQuery = this.getMoreThan(query , isParent);
    }

    if (key == "lessThan") {
      equalToQuery = this.getLessThan(query , isParent);
    }

    if (key == "contain") {
      equalToQuery = this.getContainsQuery(query , isParent);
    }

    if (key == "or") {
      equalToQuery = this.getOrQuery(query);
    }

    return equalToQuery;
  }

  getEqualToQuery(queryFeilds = {} , isParent : boolean): any {
    let query = {};
    Object.keys(queryFeilds).forEach(key => {
      if(key.indexOf('.') > -1){
        query[`$${key}$`] = {
          ...(isParent ? this.sequlizeQuery.where[key] : this.subQuery[key]),
          [Op.eq] : queryFeilds[key]
        }
        delete query[key];
      }else{
        query[key] = {
          ...(isParent ? this.sequlizeQuery.where[key] : this.subQuery[key]),
          [Op.eq] : queryFeilds[key]
        }
      }
    });

    return query;
  }

  getNotEqualToQuery(queryFeilds = {} , isParent : boolean): any {
    let query = {};

    Object.keys(queryFeilds).forEach(key => {
      query[key] = {
        ...(isParent ? this.sequlizeQuery.where[key] : this.subQuery[key]),
        [Op.ne] : queryFeilds[key]
      }
    });

    return query;
  }

  getMoreThan(queryFeilds = {} , isParent : boolean): any {
    let query = {};

    Object.keys(queryFeilds).forEach(key => {
      query[key] = {
        ...(isParent ? this.sequlizeQuery.where[key] : this.subQuery[key]),
        [Op.gt] : queryFeilds[key]
      }
    });

    return query;
  }
  getLessThan(queryFeilds = {} , isParent : boolean): any {
    let query = {};

    Object.keys(queryFeilds).forEach(key => {
      query[key] = {
        ...(isParent ? this.sequlizeQuery.where[key] : this.subQuery[key]),
        [Op.lt] : queryFeilds[key]
      }
    });

    return query;
  }
  getContainsQuery(queryFeilds = {} , isParent : boolean): any {
    let query = {};

    Object.keys(queryFeilds).forEach(key => {
      query[key] = {
        ...(isParent ? this.sequlizeQuery.where[key] : this.subQuery[key]),
        [Op.substring] : queryFeilds[key]
      }
    });

    return query;
  }
  getOrQuery(queryFeilds = {}): any {
    this.subQuery = {};

    Object.keys(queryFeilds).forEach(key => {
  
      this.subQuery = { ...this.subQuery, ...{...this.subQuery[key] ,...this.mapOperator(key , queryFeilds[key] , false) }};
      Object.keys(this.subQuery).forEach(ele=>{
        // if select is sub query add $...$ notations 
        if(ele.indexOf('.') > -1){
           this.subQuery[`$${ele}$`] = this.subQuery[ele];
           delete this.subQuery[ele];
        }
      })
    });

    return {[Op.or] : this.subQuery};
  }

  getIncludeQuery(queryFeilds = {}): any {
    this.includeQuery = {};

    Object.keys(queryFeilds).forEach(key => {
      
      this.includeQuery = { ...this.includeQuery, ...{...this.includeQuery[key] ,...this.mapOperator(key , queryFeilds[key] , false) }};

    });

    return this.includeQuery;
  }

  getPaginateQuery(paginateQuery: { pageNumber: number; pageSize?: number }) {
    if (paginateQuery.pageNumber) {
      let offset, limit, pageNumber, pageSize;
      pageNumber = paginateQuery.pageNumber ? paginateQuery.pageNumber - 1 : 0;
      pageSize = paginateQuery.pageSize || 20;
      offset = pageNumber * pageSize; // first record number
      limit = pageSize; // last record number

      return {
        offset,
        limit,
        // pageSize
        // subQuery: false
      };
    }
  }

  sortMapper(sort : {[key : string] : 'DESC' | 'ASC'}){
    let sortObj : any[] = [];

    Object.keys(sort).forEach(key => {
      // if sort with 
      if(key.indexOf('.') > -1){
        let [  alias ,column] = key.split('.');
        let modelName = this.getModelByAlias(alias , this.query.with)
        let model = SequelizeAdapter.instance.getModel(modelName)
      sortObj.push([{model , as : alias} , column , sort[key]]);  
    }else {
      sortObj.push([key , sort[key]]);

      }

    });

    return sortObj;
  }

  getModelByAlias(alias , relation : Array<IncludeQuery> = []){
    return relation.filter(ele=>{
        return ele.includeAs ==alias;
    })[0].modelName
}

}
