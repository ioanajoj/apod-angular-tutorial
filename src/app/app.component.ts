import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApodInfo } from './models/app.model';
import { ApodApiService } from './services/apod-api.service';
import { apodApiResponseMapper } from './utils/mappers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public apods: ApodInfo[] = [];
  public showApodQuery = true;

  constructor(
    private _apodApiService: ApodApiService,
    private _cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._apodApiService.apods.subscribe(newApods => {
      console.log('new apods in app.component', newApods);
      this.apods = newApods.map(apodApiResponseMapper);
      this._cd.detectChanges();
    })
  }

  public onApodsReceived(apods: ApodInfo[]) {
    this.apods = apods;
  }
}
