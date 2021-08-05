import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { API_URL } from "src/app/services/apod-api.service";
import { getYYYYMMDDformat } from "src/app/utils/date-helpers";

@Component({
    selector: 'url-display',
    templateUrl: 'url-display.component.html',
    styleUrls: ['url-display.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Emulated,
})
export class UrlDisplayComponent implements OnInit, OnChanges {
    @Input() startDate?: Date;
    @Input() endDate?: Date;
    @Input() date?: Date;
    @Input() count?: number;

    public url = '';

    constructor() {
        console.log('url-display.component constructor');
    }

    ngOnInit(): void {
        console.log('url-display.component ngOnInit');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('url-display.component ngOnChanges', changes);
        this.url = this._buildUrl();
    }

    public logChangeDetection() {
        // console.log('url-display rerendered');
    }

    private _buildUrl() {
        const url = API_URL + '?';
        const params = ['api_key=secret'];

        if (this.startDate && this.endDate) {
            params.push(this._getParam('start_date', getYYYYMMDDformat(this.startDate)));
            params.push(this._getParam('end_date', getYYYYMMDDformat(this.endDate)));
        } else if (this.date) {
            params.push(this._getParam('date', getYYYYMMDDformat(this.date)));
        } else if (this.count) {
            params.push(this._getParam('count', this.count));
        }

        return url + params.join('&');
    }

    private _getParam(key: string, value: string | number | boolean) {
        return `${key}=${encodeURIComponent(value)}`;
    }
}
