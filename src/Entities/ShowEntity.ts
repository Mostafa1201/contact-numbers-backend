import { EntityBase } from "../Core/Entity/EntityBase";
import { DataTypes } from "../Core/models/DataTypes/DataTypes";

export class ShowEntity extends EntityBase {
    attributes: { [key: string]: DataTypes } = {
        id : DataTypes.id,
        name : DataTypes.string,
        image: DataTypes.string,
        showType: DataTypes.string,
        createdAt : DataTypes.date,
        updatedAt : DataTypes.date,
        deletedAt : DataTypes.date,
    }  
    
    entityName: string = 'shows';
    constructor(){
        super()
    }

}