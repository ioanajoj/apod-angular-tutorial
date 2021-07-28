import { ApodApiResponse } from "../models";
import { ApodInfo } from "../models/app.model";

export const apodApiResponseMapper = (response: ApodApiResponse): ApodInfo => ({
    title: response.title,
    explanation: response.explanation,
    date: new Date(response.date),
    url: response.hdurl ?? response.url,
})
