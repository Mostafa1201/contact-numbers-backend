import { DataTypes } from "./DataTypes";

export abstract class DataMapper {
  constructor() {}

  abstract getType(key: DataTypes): any;
}
