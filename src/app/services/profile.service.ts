import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }
  getProfiles() {
    return this.http.get<Profile[]>(`${this.basePath}/profiles`);
  }

  getProfileId(id:any){
    return this.http.get<Profile>(`${this.basePath}/profiles/${id}`);
  }
  addProfile(profile: Profile) {
    return this.http.post<Profile>(
      `${this.basePath}/profiles`, profile);  
  }
  updateProfile(id: any, profile: Profile) {
    return this.http.put<Profile>(`${this.basePath}/profiles/${id}`, profile);
  }
  deleteProfile(id: any) {
    return this.http.delete<Profile>(`${this.basePath}/profiles/${id}`);
  }
}
