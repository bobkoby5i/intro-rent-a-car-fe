import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
 
let API_URL = environment.baseUrlBe + "/api";
let BE_URL = environment.baseUrlBe;
let _baseUrlFe = environment.baseUrlFe;  


@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenTimer: any;
  isAdmin = new Subject();
  isAuthenticated = new BehaviorSubject(false);
  selectedCars = new Subject();
  //path_to_images = API_URL + '/tmp/' // works
  path_to_images = BE_URL + '/uploads/'


  constructor(private http:HttpClient, private router: Router) { 

  }

  setAmin(data:any){
    this.isAdmin.next(data)
  }

  createUser(email: string, password: string) {
    console.log("create user " + email)
    const authData = {email: email, password: password};
    return this.http.post<{email:any, token:string, expiresIn: any, isAdmin:any}>(API_URL + '/user/register', authData);
  }

  userLogin(authData: any) {
    console.log("login user " + authData.email)
    //const authData = {email: p_email, password: p_pass};
    //return this.http.post(API_URL + '/user/login', authData);
    return this.http.post<{email:any, token:string, expiresIn: any, isAdmin:any}>(API_URL + '/user/login', authData);
  }  

  setTimer(duration: any) {
    this.tokenTimer = setTimeout(() => {this.onLogout() }, duration * 1000);
  }

  saveUserData(token: string, expiration: Date, isAdmin: any, email: any) {
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
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
      isAdmin: isAdmin,
      email: localStorage.getItem('email')
    }

}    

  onLogout() {
    this.isAuthenticated.next(false)
    clearTimeout(this.tokenTimer)
    this.setAmin(0)
    localStorage.clear();
    this.router.navigate(['login'])
  }  


  getCars(p_car_from: any, p_car_till:any ) {
    const data = {
      car_from: p_car_from, 
      car_till: p_car_till
    }
    console.log("user.service.ts: getCars(" + p_car_from+ "," + p_car_till + ")")
    return this.http.post(API_URL + '/admin/cars', data);
  }

  rentCar(id: any, from: any, till: any, fromDate: any, tillDate: any) {
    console.log("main-page.component.ts rentCar("+id+")");
    const rentInfo = {
      id:id,
      from:from,
      till:till,
      fromDate:fromDate,
      tillDate:tillDate
    }
    return this.http.post(API_URL + '/admin/reserve/' + id, rentInfo);
  }

  loggedIn(): boolean{
    return !!localStorage.getItem('token') // true if exis false if not 
    //return this.isAuthenticated; ????

  }

  getToken() {
    return localStorage.getItem('token')
  }

}
