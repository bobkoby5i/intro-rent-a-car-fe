import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string; 

  constructor(private userservice: UserService) { }

  onRegister(registerform: NgForm){
    const email = registerform.value.email;
    const pass  = registerform.value.password;
    console.log(registerform.value.email);
     this.userservice.createUser(email, pass).subscribe(res => {
       //this.router.navigate(['/login']);
       console.log(res);
       this.errorMessage = "OK";
     },err => {
       this.errorMessage = "Username already exist";
     });
}  

  ngOnInit(): void {
  }


}