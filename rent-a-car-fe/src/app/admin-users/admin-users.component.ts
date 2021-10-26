import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.adminservice.getUsers().subscribe(res => console.log(res));
  }

}
