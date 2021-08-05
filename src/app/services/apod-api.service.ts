import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApodApiResponse } from "../models";
import { getYYYYMMDDformat } from "../utils/date-helpers";

export const API_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = '';

@Injectable()
export class ApodApiService {
    public apods = new Subject<ApodApiResponse[]>();

    constructor(
        private _http: HttpClient,
    ) { }

    public async getByDateRange(startDate: Date, endDate: Date) {
        this._http.get<ApodApiResponse[]>(API_URL, {
            params: {
                'api_key': API_KEY,
                'start_date': getYYYYMMDDformat(startDate),
                'end_date': getYYYYMMDDformat(endDate),
            }
        }).subscribe(response => {
            this.apods.next(response);
        });
    }
}
