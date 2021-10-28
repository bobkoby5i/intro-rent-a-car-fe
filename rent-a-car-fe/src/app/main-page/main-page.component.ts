import { Component, OnInit } from '@angular/core';
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
    console.log("onRent()")
  }  

}
