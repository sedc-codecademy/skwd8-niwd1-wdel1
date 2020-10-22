import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { iProfile } from '../interface/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _http:HttpClient
  ) { }

  getProfileData(email:string)
  {
    return this._http.get(`${environment.apiUrl}/profile/${email}`, {withCredentials: true});
  }

  setProfileData(data:iProfile)
  {
    return this._http.post(`${environment.apiUrl}/profile/`, data, {withCredentials: true});
  }
}
