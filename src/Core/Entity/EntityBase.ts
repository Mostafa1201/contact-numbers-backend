import { DataTypes } from "../models/DataTypes/DataTypes";

export abstract class EntityBase {

    abstract attributes: {
        [key: string]: DataTypes
    }
    abstract entityName: string;
    private _relations: IEntityRelations = {
        relatedTo: [],
        relatedToMany: [],
        ownMany: [],
        ownOne: []
    }
    private relationsAttributes : Array<string> = []
    relatedTo(relation: IRelation) {
        this._relations.relatedTo.push(relation)
        this.relationsAttributes.push(relation.as)
    }

    ownMany(relation: IRelation) {
        this._relations.ownMany.push(relation)
        this.relationsAttributes.push(relation.as)


    }

    relatedToMany(relation: IRelation) {
        this._relations.relatedToMany.push(relation)
        this.relationsAttributes.push(relation.as)


    }

    ownOne(relation: IRelation) {
        this._relations.ownOne.push(relation)
        this.relationsAttributes.push(relation.as)

    }
    public get relations() : IEntityRelations{
        return this._relations
    }

    public build(entityData) {
        let entityAttributes = [...Object.keys(this.attributes) ];
        let buildedEntity = {};
        
        entityAttributes.forEach(attribute => {
            buildedEntity[attribute] = entityData[attribute]
        })
        this.relationsAttributes.forEach(attribute => {
            if(Array.isArray(entityData[attribute])){
                buildedEntity[attribute]  =  entityData[attribute].map(ele=>{
                    return ele.dataValues;
                })
            }else{
                buildedEntity[attribute]  =  entityData[attribute]?.dataValues
            }
        })
        return buildedEntity
    }
}

export interface IEntityRelations {
    relatedTo: Array<IRelation>;
    ownMany: Array<IRelation>;
    relatedToMany: Array<IRelation>;
    ownOne: Array<IRelation>;

}
interface IRelation {
    entityName: string,
    key: string,
    as: string,
    source ? : string
}