import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from '../services/user.service';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  cars: any;
  path: any;
  private unsubscribe = new Subject();  

  constructor(private userservice: UserService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.userservice.selectedCars.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.cars = res;
      this.path = this.userservice.path_to_images
    });

  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
  

  onRent(car: any){
    const from = localStorage.getItem('car_from');
    const till = localStorage.getItem('car_till');
    console.log("onRent() [" + from + "," + till + "]");
    console.log(car);
    const fromDate = moment(from).format("YYYY-MM-DD");
    const tillDate = moment(till).format("YYYY-MM-DD");
    this.userservice.rentCar(car._id, from, till, fromDate, tillDate).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res)
    })

    this.dialog.open(DialogOverviewExampleDialog, {width: '300px'})

  }  

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialog {
  
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, 
              @Inject(MAT_DIALOG_DATA) public data: {}){
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
