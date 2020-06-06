
export interface Query {
  equalTo?: {
    [key : string] : any
  };
  moreThan?: {
    [key : string] : any
  };
  lessThan?: {
    [key : string] : any
  };
  contain?: {
    [key : string] : any
  };
  notEqualTo?: {
    [key : string] : any
  };
  or?: {[key : string] : any};
  selectedAttribute?: string[];
  paginate?: {
    pageNumber: number;
    pageSize?: number;
  };
  with? : IncludeQuery[],
  sort? :{
    [key : string] : 'DESC' | 'ASC'
  }
}
export interface IncludeQuery {
  modelName: string;
  includeAs?: string;
  query?: Query;
  includeWith?: IncludeQuery[];
}
