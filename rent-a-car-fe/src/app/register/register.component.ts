import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  errorMessage: string; 
  private unsubscribe = new Subject();  

  constructor(private userservice: UserService, private router: Router) { }

  onRegister(registerform: NgForm){
    const email = registerform.value.email;
    const pass  = registerform.value.password;

    console.log(registerform.value.email);
     this.userservice.createUser(email, pass).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log("Register SUCCESS");
      console.log(res);

      const isAdmin        = res.isAdmin;
      const token          = res.token;
      const expiresIn      = res.expiresIn;
      const email          = res.email;
      const now            = new Date();
      const expirationDate = new Date(now.getTime() + expiresIn * 1000);

      this.userservice.isAuthenticated.next(true);
      this.userservice.isAdmin.next(isAdmin);
      if (token) {
          this.userservice.setTimer(expiresIn)
          this.userservice.saveUserData(token, expirationDate, isAdmin, email);
          this.router.navigate(['/main'])
      }

      //  this.router.navigate(['/login']);
     },err => {
      console.log(err);
      console.log("Register error");
       this.errorMessage = "Username already exist";
     });
}  




  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
  


}
