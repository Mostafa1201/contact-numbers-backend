import * as express from "express";
export abstract class RouteBase {
  private _path: string = '';
  public router = express.Router();
   get path(){
    return this._path
  }
  set path(path){
    this._path = path
  }
  abstract initRoutes(): void;


}
