import { EntityBase } from "../Core/Entity/EntityBase";
import { DataTypes } from "../Core/models/DataTypes/DataTypes";

export class ContactEntity extends EntityBase {
    attributes: { [key: string]: DataTypes } = {
        id : DataTypes.id,
        name : DataTypes.string,
        phone: DataTypes.string,
        address: DataTypes.string,
        notes: DataTypes.string,
        createdAt : DataTypes.date,
        updatedAt : DataTypes.date,
        deletedAt : DataTypes.date,
    }  
    
    entityName: string = 'contacts';
    constructor(){
        super()
    }

}