import { ModelBase } from "../../Core/models/ModelBase";
import { Constants } from "../../Constants";
import { ContactEntity } from "../../Entities/ContactEntity";
import { ReportQueryMapper } from "../../Core/report/ReportQueryMapper";

export class ContactsController {
    constructor() {}
    contactModel = new ModelBase(new ContactEntity());
    reportQueryMapper = new ReportQueryMapper();

    async getAllContacts(data: any){
        let query = await this.reportQueryMapper.mapRreportQuery(data);
        query['equalTo'] = { ...query['equalTo'] , deletedAt: null };
        query['selectedAttribute'] = ['id','name','phone','address','notes'];
        let count = await this.contactModel.count(query);
        let responseObject = await this.contactModel.findAll(query);
        return { contacts: responseObject, count };
    }

    async getSingleContact(id: number){
        let contact = await this.contactModel.findOne({
            equalTo: { id , deletedAt: null }
        });
        return {
            success: true,
            contact
        }
    }

    async createContact(data: any){
        this.validateContactCreate(data);
        let contact: any = await this.contactModel.create({
            name: data.name,
            phone : data.phone,
            address: data.address,
            notes: data.notes
        });
        return {
            success: true,
            contact
        };
    }

    async editContact(data: any){
        let updateData = {};
        Object.keys(data).forEach(key => {
            if(key != 'id'){
                updateData[key] = data[key];
            }
        });
        let contact: any = await this.contactModel.update(
            updateData,
            { equalTo: { id: data.id } }
        );
        return {
            message: "Contact updated successfully",
            success: true,
            contact
        };
    }

    async deleteContact(id: number) {
        if(!id){
            throw new Error("id is required");
        }
        let contact = await this.contactModel.findOne({ equalTo: { id: id, deletedAt: null } });
        if (!contact) {
            throw new Error('Contact not Found');
        }
        await this.contactModel.update({ deletedAt: new Date() }, { equalTo: { id: id } });
        return {
            success: true,
            message: 'Contact deleted successfully'
        }
    }

    validateContactCreate(data: any){
        if(!data.name){
            throw new Error("name is required");
        }
        else if(!data.phone){
            throw new Error("phone is required");
        }
        return true;
    }
}