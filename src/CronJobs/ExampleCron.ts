import * as Axios from 'axios';
import { CronJob } from "cron";
import { ICronJob } from './ICronJob';
import { ModelBase } from '../Core/models/ModelBase';
import { Constants } from '../Constants';

export class ExampleCron implements ICronJob {
    private axios = Axios.default;
    private cronJob;
    constructor(){
    }
    async run() {
        try {
            // run cron job every day at 12:00 AM
            this.cronJob = new CronJob(
                "0 0 */3 * * *",
                async () => {
                    // do the job here
                    // await this.checkExpired()
                },
                () => { },
                true,
            );
        } catch (error) {
            return error;
        }
    }

}
