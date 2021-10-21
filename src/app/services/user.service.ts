import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 

  }

  createUser(email: string, password: string) {
    console.log("create user " + email)
    const authData = {email: email, password: password};
    return this.http.post('http://localhost:3000/api/user/signup', authData);

  }

}
