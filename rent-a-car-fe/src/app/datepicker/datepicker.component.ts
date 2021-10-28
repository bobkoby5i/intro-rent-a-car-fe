import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(dateform: NgForm){
    console.log(dateform.value.dateinput)
    const from0 = dateform.value.dateinput[0];
    const until0 = dateform.value.dateinput[1];
    const from1 = moment(from0).format('YYYYMMDD');
    const until1 = moment(until0).format('YYYYMMDD');
    localStorage.setItem('car_from', from1);
    localStorage.setItem('car_until', until1);
  }

}
