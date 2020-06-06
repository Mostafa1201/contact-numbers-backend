import { ShowBaseService } from "./ShowBaseService";
import { ModelBase } from "../Core/models/ModelBase";
import { ShowEntity } from "../Entities/ShowEntity";
import { MangaEntity } from "../Entities/MangaEntity";
import { Constants } from "../Constants";


export class MangaService extends ShowBaseService{
    showModel = new ModelBase(new ShowEntity());
    mangaModel = new ModelBase(new MangaEntity());

    async getTop50(){
        const movieUrl = 'https://myanimelist.net/topmanga.php';
        let response = await this.sendRequest(movieUrl);
        let data: any = [];
        let $ = this.cheerio.load(response);
        let tableRows :any[] = $('.top-ranking-table tr');
        for (let i = 1; i < tableRows.length; i++){
            let $row = $(tableRows[i]);
            
            let rank = $row.find('td:nth-child(1) > span').text();            
            let name = $row.find('td:nth-child(2) > .detail > a').text();
            let details = $row.find('td:nth-child(2) > .detail > .information.di-ib.mt4').text().trim().split('\n');
            let score = $row.find('td:nth-child(3) > div > span').text();
            let dateParsed = details[1].trim().split('-');
            let date = dateParsed[0] + '-' + (dateParsed[1] == "" ? ' present' : dateParsed[1]);
            let mangaLink = $row.find('td:nth-child(2) > a').attr('href');
            let manga = await this.sendRequest(mangaLink);            
            let $$ = this.cheerio.load(manga);
            let image = $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('data-src');
            let show: any = await this.showModel.create({
                name,image,showType: Constants.SHOWS.MANGA
            });
            await this.mangaModel.create({
                rank,score,date,showId:show.id
            });
            data.push({
                rank,name,score,date,image
            });            
            
        }
        return data;
    }
}