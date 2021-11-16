import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin: number = 0;
  auth: boolean = false;
  navbar: any;

  constructor(private userservice: UserService) { 

    const data = this.userservice.getUserData();
    if (data) {
      if (data.isAdmin === "1") {
        this.admin = 1;
      } else {
        this.admin = 0;
      }
    }

  }

  ngOnInit() {
    this.navbar = document.querySelector('.navbar-collapse');    
    this.userservice.isAdmin.subscribe(result => {
      this.admin = <number>result;
    });

    this.userservice.isAuthenticated.subscribe(res => {
      this.auth = res;
    });
  }

  onLogout(): void {
    this.userservice.onLogout()
    this.auth = false; 
    this.admin = 0; 
  }  

  collapse(): void {
    this.navbar.classList.remove('show');  
  }



}
