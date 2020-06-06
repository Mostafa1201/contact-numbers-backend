import { Query, IncludeQuery } from "../models/Query/Query";
import { query } from "express-validator";

export class ReportQueryMapper {

    mapRreportQuery(query: {
        date?: { gte: string, lt: string } | null,
        search?: string,
        pageSize?: number,
        pageNumber?: number,
        sort?: string,
        sortType?: 'ASC' | 'DESC',
        columns: Array<string>,
        with?: Array<IncludeQuery>
        filterOptions?: any
    }){

        let queryToBeMapped: Query = {
            with: query.with
        };

        queryToBeMapped['paginate'] = {
            pageNumber : query.pageNumber || 1, 
            pageSize : query.pageSize || 20
        };

        if (query.search) {

            let contain: Object = {};

            let date_search = this.prepareDateRegEx(query.search);

            for (let ele of query.columns) {

                if (ele === 'createdAt' && date_search) {
                    contain[ele] = date_search;
                } else {
                    contain[ele] = query.search;
                }
            }
            queryToBeMapped['or'] = { contain };

        }

        if (query.sort) {
        
            queryToBeMapped['sort'] = {
                [query.sort]: query.sortType || 'ASC'
            };
        }
        if (query.date && query.date.lt && query.date.gte) {
            let date = query.date;
            queryToBeMapped['lessThan'] = {
                createdAt: date.lt
            };
            queryToBeMapped['moreThan'] = {
                createdAt: date.gte
            };
        }

        if(query.filterOptions){
            queryToBeMapped['equalTo'] = {...query.filterOptions , ...queryToBeMapped['equalTo']}
        }

        return queryToBeMapped;
    }


    prepareDateRegEx(search: string) {
        let reg_date = new RegExp('.*' + search + '.*', 'gi');
        let date_search = '';
        var monthe = {
            "january": '01',
            "february": '02',
            "march": '03',
            "april": '04',
            "may": '05',
            "june": '06',
            "july": '07',
            "august": '08',
            "september": '09',
            "october": '10',
            "november": '11',
            "december": '12'
        };
        Object.keys(monthe).forEach(month => {
            if (month.match(reg_date)) {
                date_search = `|-${monthe[month]}-`;
            };
        });

        date_search = date_search.slice(1, date_search.length);
        return date_search;
    }
}