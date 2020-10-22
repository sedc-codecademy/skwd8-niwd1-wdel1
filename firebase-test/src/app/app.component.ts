import { Component } from '@angular/core';
import { HealthcheckService } from './service/healthcheck.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'firebase-test';
  user:any = JSON.parse(localStorage.getItem('user'));

  constructor(
    private _hc:HealthcheckService
  ){}

  ngOnInit(){
    setInterval(() => {
      this.healthCheck();
    }, 4000)
  }

  healthCheck()
  {
    this._hc.check().subscribe((data) => {
      console.log(data)
    })
  }
}
