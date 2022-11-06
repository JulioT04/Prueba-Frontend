import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get<User[]>(`${this.basePath}/users`);
  }

  getUserId(id:any){
    return this.http.get<User>(`${this.basePath}/users/${id}`);
  }
  getUserMaxId(){
    return this.http.get<User>(`${this.basePath}/users/maxId`);
  }
  addUser(user: User) {
    return this.http.post<User>(
      `${this.basePath}/users`,
      user
    );  
  }
  updateUser(id: any, user: User) {
    return this.http.put<User>(`${this.basePath}/users/${id}`, user);
  }
  upgradeUser(id: any, user: User) {
    return this.http.put<User>(`${this.basePath}/users/upgrade/${id}`, user);
  }
  deleteUser(id: any) {
    return this.http.delete<User>(`${this.basePath}/users/${id}`);
  }
}
