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
    return this.http.post(API_URL + '/user/signup', authData);
  }

}
