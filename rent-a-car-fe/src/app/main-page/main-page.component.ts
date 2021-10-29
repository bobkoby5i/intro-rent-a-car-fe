import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  cars: any;
  path: any;

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.userservice.selectedCars.subscribe(res => {
      this.cars = res;
      this.path = this.userservice.path_to_images
    });

  }

  onRent(car: any){
    const from = localStorage.getItem('car_from');
    const till = localStorage.getItem('car_till');
    console.log("onRent() [" + from + "," + till + "]");
    console.log(car);
    const fromDate = moment(from).format("YYYY-MM-DD");
    const tillDate = moment(till).format("YYYY-MM-DD");
    this.userservice.rentCar(car._id, from, till, fromDate, tillDate).subscribe(res => {
      console.log(res)
    })
  }  

}
