import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApodInfo } from 'src/app/models/app.model';
import { ApodApiService } from 'src/app/services/apod-api.service';
import { apodApiResponseMapper } from 'src/app/utils/mappers';

@Component({
    selector: 'apod-query',
    templateUrl: 'apod-query.component.html',
    styleUrls: ['apod-query.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ApodQueryComponent implements OnDestroy {
    @Output() newApods = new EventEmitter<ApodInfo[]>();
    @Output() close = new EventEmitter();

    public dateRange: FormGroup;
    private _destroyed$ = new Subject<boolean>();

    constructor(
        private _apodApiService: ApodApiService,
    ) {
        this.dateRange = new FormGroup({
            start: new FormControl(),
            end: new FormControl()
        });
    }

    ngOnDestroy(): void {
        console.log('apod-query.component ngOnDestroy');
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    public requestApod() {
        const startDate: Date = this.dateRange.get('start')?.value;
        const endDate: Date = this.dateRange.get('end')?.value;
        if (!startDate || !endDate) { return; }
        this._apodApiService.getByDateRange(startDate, endDate)
            .subscribe(response => {
                console.log('received response from API');
                this.newApods.emit(response.map(apodApiResponseMapper))
            });
    }

    public onClose() {
        this.close.emit();
    }
}
