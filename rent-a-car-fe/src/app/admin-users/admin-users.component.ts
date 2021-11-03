import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../services/admin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns: string[] = [  'email', 'isAdmin', 'edit'];
  dataSource = new MatTableDataSource<UserRow>();
  users: any;
  private unsubscribe = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;


  constructor(private adminservice: AdminService, private _router: Router) { }

  ngOnInit(): void {
    this.adminservice.getUsers().pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        console.log(res);
        const ELEMENT_DATA: UserRow[] = [];
        this.users = res;
        this.users.forEach((element: User) => {
          const user_row: UserRow = {
            id: element._id,
            email:   element.email,
            isAdmin: element.isAdmin
          }
          ELEMENT_DATA.push(user_row);
        });
        this.dataSource.data = ELEMENT_DATA;
        console.log(ELEMENT_DATA);
      },
      err => {
        if (err instanceof HttpErrorResponse ){
          if (err.status === 401) {
            this._router.navigate(['/login'])     
          }
        }    
      }
    );
  }

  onDelete(element: any): void {
    console.log('onDelete()');
    this.adminservice.deleteUser(element.id).pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        const ELEMENT_DATA: UserRow[] = [];
        this.users = res;
        this.users.forEach((element: User) => {
          const user_row: UserRow = {
            id: element._id,
            email:   element.email,
            isAdmin: element.isAdmin
          }
          ELEMENT_DATA.push(user_row);
        });
        this.dataSource.data = ELEMENT_DATA;
        console.log(ELEMENT_DATA);
      },
      err => {
        if (err instanceof HttpErrorResponse ){
          if (err.status === 401) {
            this._router.navigate(['/login'])     
          }
        }      
      }
    );
  }  

  onAdmin(element: any): void {
    console.log('onAdmin()');
    this.adminservice.makeAdmin(element.id).pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        const ELEMENT_DATA: UserRow[] = [];
        this.users = res;
        this.users.forEach((element: User) => {
          const user_row: UserRow = {
            id: element._id,
            email:   element.email,
            isAdmin: element.isAdmin
          }
          ELEMENT_DATA.push(user_row);
        });
        this.dataSource.data = ELEMENT_DATA;
        console.log(ELEMENT_DATA);
      });
  }  

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}

export interface UserRow {
  id: string;
  email: string;
  isAdmin: number;
}
export interface User {
  _id: string;
  email: string;
  isAdmin: number;
}



