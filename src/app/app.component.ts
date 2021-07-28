import { Component } from '@angular/core';
import { ApodInfo } from './models/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public apods: ApodInfo[] = [];

  public onApodsReceived(apods: ApodInfo[]) {
    this.apods = apods;
  }
}
