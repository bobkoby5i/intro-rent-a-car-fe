import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns: string[] = [ 'email', 'isAdmin'];
  dataSource = new MatTableDataSource<Users>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.adminservice.getUsers().subscribe(res => {
      console.log(res);
      this.dataSource.data = ELEMENT_DATA;
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}

export interface Users {
  email: string;
  isAdmin: number;
}



const ELEMENT_DATA: Users[] = [
  {email: 'Hydrogen', isAdmin: 0},
  {email: 'Helium', isAdmin: 0},
  {email: 'Lithium', isAdmin: 0},
  {email: 'Beryllium', isAdmin: 0},
  {email: 'Boron', isAdmin: 0},
  {email: 'Carbon', isAdmin: 0},
  {email: 'Nitrogen', isAdmin: 0},
];