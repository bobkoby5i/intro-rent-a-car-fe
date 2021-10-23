import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
 
let API_URL = environment.baseUrlBe + "/api";
let _baseUrlFe = environment.baseUrlFe;  


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 

  }

  createUser(email: string, password: string) {
    console.log("create user " + email)
    const authData = {email: email, password: password};
    return this.http.post(API_URL + '/user/register', authData);
  }

  userLogin(p_email: string, p_pass: string) {
    console.log("login user " + p_email)
    const authData = {email: p_email, password: p_pass};
    return this.http.post(API_URL + '/user/login', authData);
    return this.http.post<{token:string, expiresIn: any, admin:any}>(API_URL + '/user/login', authData);
  }  

}
