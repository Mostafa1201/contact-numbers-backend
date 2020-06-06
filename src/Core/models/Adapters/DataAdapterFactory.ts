import { SequelizeAdapter } from "./SequelizeAdapter/SequelizeAdapter"
import { DataAdapter } from "../DataAdapter"
import { Constants} from '../../../Constants'
export class DataAdapterFactory {

    getAdapter() : DataAdapter{
        let currentAdapter = Constants.DATA_ADAPTER

        switch(currentAdapter) {
            case 'Sequelize' :
                return  SequelizeAdapter.instance
            default :
                throw Error('you must set DATA_ADAPTER in the env variables ')
        }
    }
}