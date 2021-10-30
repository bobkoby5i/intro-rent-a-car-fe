import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnDestroy  {
  private unsubscribe = new Subject();

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }  

  onSearch(dateform: NgForm){
    console.log(dateform.value.dateinput)
    const from0 = dateform.value.dateinput[0];
    const till0 = dateform.value.dateinput[1];
    const from1 = moment(from0).format('YYYYMMDD');
    const till1 = moment(till0).format('YYYYMMDD');
    console.log('car_from : ', from1 )
    console.log('car_till : ', till1 )
    localStorage.setItem('car_from', from1);
    localStorage.setItem('car_till', till1);
    //this.userservice.getCars(from1, till1).subscribe(res => this.userservice.selectedCars.next(res));
    this.userservice.getCars(from1, till1).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
      this.userservice.selectedCars.next(res);
    });
  }




}
