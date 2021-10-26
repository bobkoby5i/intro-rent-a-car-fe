import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns: string[] = [ 'email', 'isAdmin', 'edit'];
  dataSource = new MatTableDataSource<User>();
  users: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;


  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.adminservice.getUsers().subscribe(res => {
      console.log(res);
      const ELEMENT_DATA: UserRow[] = [];
      this.users = res;
      this.users.forEach((element: User) => {
        const user_row: UserRow = {
          email:   element.email,
          isAdmin: element.isAdmin,
          action: 'EDIT'
        }
        //const email = element.email;
        //const isAdmin = element.email;
        //const action = "ACTION";
        ELEMENT_DATA.push(user_row);
      });
      this.dataSource.data = ELEMENT_DATA;
      console.log(ELEMENT_DATA);
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}

export interface UserRow {
  email: string;
  isAdmin: number;
  action: string;
}
export interface User {
  email: string;
  isAdmin: number;
}



const ELEMENT_DATA2: User[] = [
  {email: 'Hydrogen', isAdmin: 0},
  {email: 'Helium', isAdmin: 0},
  {email: 'Lithium', isAdmin: 0},
  {email: 'Beryllium', isAdmin: 0},
  {email: 'Boron', isAdmin: 0},
  {email: 'Carbon', isAdmin: 0},
  {email: 'Nitrogen', isAdmin: 0},
];