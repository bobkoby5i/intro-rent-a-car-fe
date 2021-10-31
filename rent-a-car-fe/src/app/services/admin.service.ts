import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../environments/environment';

let API_URL = environment.baseUrlBe;
let _baseUrlFe = environment.baseUrlFe;  



@Injectable({
  providedIn: 'root'
})

// TODO What is the difference  here ?
// @Injectable({
//   providedIn: 'root'
// })
export class AdminService {

  constructor(private http:HttpClient) { }

  createCar(p_brand: string, p_model: string, p_power: string, p_seats: number, p_filename: string){
    const carData = {
      brand:    p_brand, 
      model:    p_model, 
      power:    p_power,
      seats:    p_seats,
      imgUrl:   p_filename
    };
    return this.http.post(API_URL + '/api/admin/create-car', carData);
  }

  getUsers(){
    console.log("admin.service.ts: getReservatonions()")
    console.log("call GET " + API_URL + '/api/admin/users')
    return this.http.get(API_URL + '/api/admin/users');
  }


  deleteUser(id:string){
    console.log("deleteUser:" + id);
    return this.http.delete(API_URL + '/api/admin/delete-user/'+id);
  }

  makeAdmin(id:string){
    console.log("makeAdmin:" + id);
    const userDate = {isAdmin:1}
    return this.http.patch(API_URL + '/api/admin/make-admin/'+id, userDate);
  }

  getCars(){
    console.log("admin.service.ts: getCars()")
    console.log("call GET " + API_URL + '/api/admin/cars')
    return this.http.get(API_URL + '/api/admin/cars');
  }

  deleteCar(id:string){
    console.log("deleteCar:" + id);
    return this.http.delete(API_URL + '/api/admin/cars/'+ id);
  }


  getReservatonions() {
    console.log("admin.service.ts: getReservatonions()")
    console.log("call GET " + API_URL + '/api/admin/reservations')
    return this.http.get(API_URL + '/api/admin/reservations');    
  }

  cancelReservation(id:string){
    console.log("cancelReservation:" + id);
    return this.http.delete(API_URL + '/api/admin/reservations/'+id);
  }  
  

}
