import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails } from '../interfaces/login.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginUser(user_details:loginDetails ){
    return this.http.post<{message:string, token:string, error:string}>('http://localhost:4100/auth/login', user_details)
  }
}
