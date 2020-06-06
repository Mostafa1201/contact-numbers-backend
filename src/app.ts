import express = require("express");
import bodyParser = require("body-parser");
import { RouteBase } from "./Core/routes/RouteBase";
import { ICronJob } from "./CronJobs/ICronJob";
// import { VoucherExpiredNotify } from "./CronJobs/VoucherExpiredNotify";
var cors = require("cors");


export class App {
    private app: express.Application;

    constructor(Route: RouteBase[]) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoute(Route);
        this.runCronJobs([
            // new VoucherExpiredNotify()
        ])
    }
    /**
     * @description server listen method to givin port
     * @param port
     */
    public listen(port: string | number, host: string) {
        this.app.listen({ port, host }, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
    /**
     * run all cron jobs
     */
    private async runCronJobs(cronJobs : ICronJob[]){
        for (const cronJob of cronJobs) {
            await cronJob.run()
        }
    }
    /**
     * @description return app after all intializtions
     */
    public getServer() {
        return this.app;
    }
    /**
     * @description set app global middlewares
     */
    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(cors());
        this.app.set('view engine', 'ejs');
        this.app.set('views', __dirname + '/views');
        this.app.use('/assets', express.static(__dirname + '/views/assets'));
    }

    /**
     * init app routes with path and routes mehtods
     * @param Route
     */
    private initializeRoute(Route: RouteBase[]) {
        Route.forEach(Route => {
            Route.initRoutes()
            this.app.use(Route.path, Route.router);
        });
    }
}
