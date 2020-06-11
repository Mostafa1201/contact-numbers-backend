import { EntityBase } from "../Core/Entity/EntityBase";
import { DataTypes } from "../Core/models/DataTypes/DataTypes";

export class UserEntity extends EntityBase {
    attributes: { [key: string]: DataTypes } = {
        id : DataTypes.id,
        username : DataTypes.string,
        password: DataTypes.string,
        createdAt : DataTypes.date,
        updatedAt : DataTypes.date,
        deletedAt : DataTypes.date,
    }  
    
    entityName: string = 'users';
    constructor(){
        super()
    }

}