import { Query } from "./Query";

export abstract class QueryMapper {
  abstract getQuery(query?: Query): any;
  abstract getEqualToQuery(queryFeilds? , isParen?): any;
  abstract getNotEqualToQuery(queryFeilds? , isParen?): any;
  abstract getMoreThan(queryFeilds? , isParen?): any;
  abstract getLessThan(queryFeilds? , isParen?): any;
  abstract getContainsQuery(queryFeilds? , isParen?): any;
  abstract getOrQuery(queryFeilds?): any;
  abstract getPaginateQuery(paginateQuery: {
    pageNumber: number;
    pageSize?: number;
  }): any;
}
