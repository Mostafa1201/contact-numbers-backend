import { Sequelize, DataTypes as sequelizeDataTypes } from "sequelize";
import { DataTypes } from "../../DataTypes/DataTypes";
import { DataMapper } from "../../DataTypes/DataMapper";

export class SequelizeMapper extends DataMapper {
  constructor() {
    super();
  }

  getType(key: DataTypes): any {
    switch (key) {
      case "string":
        return sequelizeDataTypes.STRING;
      case "int":
        return sequelizeDataTypes.INTEGER;
      case "float":
        return sequelizeDataTypes.FLOAT;
      case "date":
        return sequelizeDataTypes.DATE;
      case "text":
        return sequelizeDataTypes.TEXT;
      case "id":
        return {
          type: sequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        };
      case "boolean":
        return sequelizeDataTypes.BOOLEAN;
      default:
        return null;
    }
  }
}
