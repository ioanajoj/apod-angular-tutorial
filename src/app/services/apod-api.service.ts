import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApodApiResponse } from "../models";
import { getYYYYMMDDformat } from "../utils/date-helpers";

export const API_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = '';

@Injectable()
export class ApodApiService {

    constructor(
        private _http: HttpClient,
    ) { }

    public getByDateRange(startDate: Date, endDate: Date) {
        return this._http.get<ApodApiResponse[]>(API_URL, {
            params: {
                'api_key': API_KEY,
                'start_date': getYYYYMMDDformat(startDate),
                'end_date': getYYYYMMDDformat(endDate),
            }
        })
    }
}
