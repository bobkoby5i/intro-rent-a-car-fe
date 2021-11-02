import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../services/admin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

let API_URL = environment.baseUrlBe;
let BACKEND_URL = environment.baseUrlBe;  


@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {

  displayedColumns: string[] = [  'brand', 'model', 'seats', 'imgUrl1','imgUrl2', 'action'];
  dataSource = new MatTableDataSource<CarRow>();
  cars: any;
  private unsubscribe = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;

  constructor(private adminservice: AdminService, private _router: Router) { }

  ngOnInit(): void {
    this.adminservice.getCars().pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        console.log(res);
        this.cars = res;
        const DATA_ELEMENTS: CarRow[] = [];
        this.cars.forEach((car: Car) => {
          const car_row: CarRow = {
            id      : car._id,
            brand   : car.brand,
            model   : car.model,
            power   : car.power,
            seats   : car.seats,
            imgName : car.imgUrl,
            imgUrl1 : BACKEND_URL + "/uploads/"+ car.imgUrl,
            imgUrl2 : BACKEND_URL + "/api/photo/"+ car.imgUrl,
          }
          DATA_ELEMENTS.push(car_row);
        });
        console.log(DATA_ELEMENTS);
        this.dataSource.data = DATA_ELEMENTS;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        if (err instanceof HttpErrorResponse ){
          if (err.status === 401) {
            this._router.navigate(['/login'])     
          }
      }
    });
  }

  onDelete(element: any): void {
    console.log('onDelete()');
    this.adminservice.deleteCar(element.id).pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        const DATA_ELEMENTS: CarRow[] = [];
        this.cars = res;
        this.cars.forEach((car: Car) => {
          const car_row: CarRow = {
            id      : car._id,
            brand   : car.brand,
            model   : car.model,
            power   : car.power,
            seats   : car.seats,
            imgName : car.imgUrl,
            imgUrl1 : BACKEND_URL + "/uploads/"+ car.imgUrl,
            imgUrl2 : BACKEND_URL + "/api/photo/"+ car.imgUrl,
          }
          DATA_ELEMENTS.push(car_row);
        });
        console.log(DATA_ELEMENTS);
        this.dataSource.data = DATA_ELEMENTS;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        if (err instanceof HttpErrorResponse ){
          if (err.status === 401) {
            this._router.navigate(['/main'])     
          }
        }
      }
    );
  }  
  
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }  

}

export interface CarRow {
  id: string;
  brand: string;
  model: string;
  power: string;
  seats: number;
  imgName: string;
  imgUrl1: string;
  imgUrl2: string;
}

export interface Car {
  _id: string;
  brand: string;
  model: string;
  power: string;
  seats: number;
  imgUrl: string;
}

