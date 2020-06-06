import { RouteBase } from "../Core/routes/RouteBase";
import { Request, Response } from "express";
import { ShowsController } from "../Controllers/Shows/ShowsController";

export class ShowsRoute extends RouteBase {
    showsController = new ShowsController()
    initRoutes(): void {
        this.path = '/'
        this.router.post('/shows/:type/all' , this.getAllShows);

    }

    private getAllShows = async (req : Request , res : Response)=>{
        try {
            console.log("req.body: ",req.body);
            let result = await this.showsController.getAllShows(req.body); 
            res.send(result)
        }catch(e){
            res.status(400).send(e.message)
        }
    }

    

}