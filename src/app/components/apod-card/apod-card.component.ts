import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ApodInfo } from 'src/app/models/app.model';

@Component({
    selector: 'apod-card',
    templateUrl: 'apod-card.component.html',
    styleUrls: ['apod-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ApodCardComponent {
    @Input() apod!: ApodInfo;
}
