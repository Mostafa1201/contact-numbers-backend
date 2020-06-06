import { EntityBase } from "../Core/Entity/EntityBase";
import { DataTypes } from "../Core/models/DataTypes/DataTypes";

export class MangaEntity extends EntityBase {
    attributes: { [key: string]: DataTypes } = {
        id : DataTypes.id,
        rank : DataTypes.int,
        score: DataTypes.float,
        date: DataTypes.string,
        showId: DataTypes.int,
        createdAt : DataTypes.date,
        updatedAt : DataTypes.date,
    }  
    
    entityName: string = 'mangas';
    constructor(){
        super()
    }

}