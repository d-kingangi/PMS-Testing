import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { users } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  createUser(newUser: users) {
    return this.http.post<{ message: string, error: string }>('http://localhost:4100/users', newUser, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  getOneUserDetails(id:string){
    return this.http.get<{user:users[]}>(`http://localhost:4100/users/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    })
  }
}
