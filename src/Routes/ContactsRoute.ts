import { RouteBase } from "../Core/routes/RouteBase";
import { Request, Response } from "express";
import { ContactsController } from "../Controllers/Contacts/ContactsController";
import { IsAuthorized } from "../Middlewares/IsAuthorized";

export class ContactsRoute extends RouteBase {
    contactsController = new ContactsController()
    initRoutes(): void {
        this.path = '/contacts'
        this.router.post('/all' , this.getAllContacts);
        this.router.post('/get' , this.getSingleContact);
        this.router.post('/create', IsAuthorized , this.createContact);
        this.router.post('/edit' , IsAuthorized, this.editContact);
        this.router.post('/delete' , IsAuthorized, this.deleteContact);
    }

    private getAllContacts = async (req : Request , res : Response)=>{
        try {
            console.log("req.body: ",req.body);
            let result = await this.contactsController.getAllContacts(req.body); 
            res.send(result)
        }catch(e){
            res.status(400).send(e.message)
        }
    }

    private getSingleContact = async (req : Request , res : Response)=>{
        try {
            console.log("req.body: ",req.body);
            let result = await this.contactsController.getSingleContact(req.body.id); 
            res.send(result)
        }catch(e){
            res.status(400).send(e.message)
        }
    }

    private createContact = async (req : Request , res : Response)=>{
        try {
            console.log("req.body: ",req.body);
            let result = await this.contactsController.createContact(req.body); 
            res.send(result)
        }catch(e){
            res.status(400).send(e.message)
        }
    }

    private editContact = async (req : Request , res : Response)=>{
        try {
            console.log("req.body: ",req.body);
            let result = await this.contactsController.editContact(req.body); 
            res.send(result)
        }catch(e){
            res.status(400).send(e.message)
        }
    }
    
    private deleteContact = async (req : Request , res : Response)=>{
        try {
            console.log("req.body: ",req.body);
            let result = await this.contactsController.deleteContact(req.body.id); 
            res.send(result)
        }catch(e){
            res.status(400).send(e.message)
        }
    }

}