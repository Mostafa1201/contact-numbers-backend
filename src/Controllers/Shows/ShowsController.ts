import { ModelBase } from "../../Core/models/ModelBase";
import { Constants } from "../../Constants";
import { ShowsFactory } from "../../Factories/ShowsFactory";

export class ShowsController {
    // merchantModel = new ModelBase(new MerchantsEntity())
    showsFactory = new ShowsFactory();
    constructor() {

    }

    async getAllShows(requestData: any){
        let showFactoryResult = this.showsFactory.getShow(requestData.showType);
        let result = showFactoryResult.getTop50();
        return result;
    }


}

export interface MerchantCreateRequest {
    merchant_name: string;
    fname: string;
    lname: string;
    email: string;
    mobile: string;
    callBackUrl: string;
    flatRate : number,
    OnUSRate : number,
    OffUsRate : number,
    providers: Array<{
        providerId: number,
        config: {
            [key: string]: any
        }
    }>
    domains : string[]
}

export interface MerchantEditRequest extends MerchantCreateRequest {
    id: number
}