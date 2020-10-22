import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private _auth:AuthService,
    private _router:Router
  ) { }

  ngOnInit() {
  }

  sendForm(formData:NgForm)
  {
    if(formData.valid)
    {
      this._auth.login(formData.value).subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data));

        // this._router.navigate(['/dashboard']);
        window.location.href = '/dashboard';
      })
    }
  }

}
