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
    return this.http.get(API_URL + '/api/admin/users');
  }
}
