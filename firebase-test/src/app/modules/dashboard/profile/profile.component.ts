import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { iProfile } from 'src/app/interface/profile.interface';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  userData:iProfile = {
    email: '', 
    fullname: '', 
    phone: undefined,
    zipcode: undefined,
    city: undefined,
    country: undefined,
    street: undefined
  };
  
  constructor(
    private _ps:ProfileService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile()
  {
    let userData = JSON.parse(localStorage.getItem('user'));

    this._ps.getProfileData(userData.user.email).subscribe((data:iProfile[]) => {
      
      if(data.length)
      this.userData = data[0];

      if( ! this.userData.email )
      this.userData.email = userData.user.email;
    }, (error) => { 
      if(error.error.code && error.error.code === 'permission-denied')
      {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    })
  }

  updateProfile(formData:NgForm)
  {
    if(formData.valid)
    {
      this._ps.setProfileData(formData.value).subscribe((response) => {
        console.log(response);
      })
    }
  }
}
