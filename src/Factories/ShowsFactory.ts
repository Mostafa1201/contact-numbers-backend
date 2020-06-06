import { Constants } from "../Constants";
import { MangaService } from "../services/MangaService";
import { SeriesService } from "../services/SeriesService";
export class ShowsFactory {
    getShow(type : string){
        type = type.toLowerCase();
        switch (type) {
            case Constants.SHOWS.MANGA:
                return new MangaService();
            default:
                return new SeriesService();
        }
    }
}