import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
 
let API_URL = environment.baseUrlBe + "/api";
let _baseUrlFe = environment.baseUrlFe;  


@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenTimer: any;
  isAdmin = new Subject();
  isAuthenticated = new BehaviorSubject(false);


  constructor(private http:HttpClient, private router: Router) { 

  }

  setAmin(data:any){
    this.isAdmin.next(data)
  }

  createUser(email: string, password: string) {
    console.log("create user " + email)
    const authData = {email: email, password: password};
    return this.http.post(API_URL + '/user/register', authData);
  }

  userLogin(p_email: string, p_pass: string) {
    console.log("login user " + p_email)
    const authData = {email: p_email, password: p_pass};
    //return this.http.post(API_URL + '/user/login', authData);
    return this.http.post<{token:string, expiresIn: any, admin:any}>(API_URL + '/user/login', authData);
  }  

  setTimer(duration: any) {
    this.tokenTimer = setTimeout(() => {this.onLougout() }, duration * 1000);
  }

  saveUserData(token: string, expiration: Date, isAdmin: any) {
      localStorage.setItem('token', token)
      localStorage.setItem('expiration', expiration.toString())
      localStorage.setItem('isAdmin', isAdmin)

  }  

  getUserData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration') || "";
    const isAdmin = localStorage.getItem('isAdmin');
    if (!token) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expiration),
      isAdmin: isAdmin
    }

}    

  onLougout() {
    this.isAuthenticated.next(false)
    clearTimeout(this.tokenTimer)
    this.setAmin(0)
    localStorage.removeAll()
    this.router.navigate(['login'])
  }  

}
