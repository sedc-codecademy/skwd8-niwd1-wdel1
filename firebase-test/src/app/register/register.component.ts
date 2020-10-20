import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _auth:AuthService
  ) { }

  ngOnInit() {
  }

  sendForm(formData:NgForm)
  {
    console.log(formData.value);

    if(formData.valid)
    {
      this._auth.register(formData.value).subscribe(data => { 
        console.log( data) 
        formData.reset();
      });
    }
  }
}
