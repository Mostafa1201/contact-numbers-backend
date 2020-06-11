import { RouteBase } from "../Core/routes/RouteBase";
import { Request, Response } from "express";
import { AuthController } from "../Controllers/AuthController";

export class LoginRoute extends RouteBase {
    authController = new AuthController()
    initRoutes(): void {
        this.path = '/auth';
        this.router.post('/login' , this.login);
    }

    private login = async (req : Request , res : Response)=>{
        try {
            let result = await this.authController.login(req.body); 
            res.send(result)
        }catch(e){
            res.status(400).send(e.message)
        }
    }

}