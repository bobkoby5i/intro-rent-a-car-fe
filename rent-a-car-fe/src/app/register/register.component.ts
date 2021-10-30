import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  errorMessage: string; 
  private unsubscribe = new Subject();  

  constructor(private userservice: UserService) { }

  onRegister(registerform: NgForm){
    const email = registerform.value.email;
    const pass  = registerform.value.password;
    console.log(registerform.value.email);
     this.userservice.createUser(email, pass).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
       //this.router.navigate(['/login']);
       console.log(res);
       this.errorMessage = "OK";
     },err => {
      console.log(err);
       this.errorMessage = "Username already exist";
     });
}  

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
  


}
