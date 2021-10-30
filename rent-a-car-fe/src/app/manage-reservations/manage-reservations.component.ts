import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator'
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css']
})
export class ManageReservationsComponent implements OnInit {
  displayedColumns: string[] = ['car_id', 'reserved_from', 'reserved_till', 'cancel'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;  reservations: any;

  constructor(private adminservice: AdminService) { }
  

  ngOnInit(): void {

    this.adminservice.getReservatonions().subscribe(res => {
      console.log("ngOnInit() - get reservations");
      const ELEMENT_DATA: ReservationRow[] = [];
      this.reservations = res;
      this.reservations.forEach((element: Reservation) => {
        const row: ReservationRow = {
          id         : element._id,
          car_id     : element.car_id,
          fromDate   : element.fromDate,
          tillDate   : element.tillDate
        }
        console.log("adding row:" +row);
        ELEMENT_DATA.push(row);
      });
      this.dataSource.data = ELEMENT_DATA;
      console.log(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });    
 
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit() ");
    this.dataSource.paginator = this.paginator;
  }

  onCancelReservation(element: any): void {
    const id = element.id
    console.log("onCancelReservation("+id+")");
    this.adminservice.cancelReservation(id).subscribe(res => {
        console.log("onCancelReservation() - canceled.");
        const ELEMENT_DATA: ReservationRow[] = [];
        this.reservations = res;
        this.reservations.forEach((reservation: Reservation) => {
          const row: ReservationRow = {
            id         : reservation._id,
            car_id     : reservation.car_id,
            fromDate   : reservation.fromDate,
            tillDate   : reservation.tillDate
          }
          console.log("adding row:" +row);
          ELEMENT_DATA.push(row);
        });
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
    })
  }
}


//record in mat table 
export interface ReservationRow {
  id: string;
  car_id: string;
  fromDate: Date;
  tillDate: Date;
}

//record from mongo 
export interface Reservation {
  _id: string;
  car_id: string;
  from: number;
  till: number;
  fromDate: Date;
  tillDate: Date;
}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];