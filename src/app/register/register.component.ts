import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  onRegister(loginform: NgForm){
    console.log(loginform.value.email)
}  

  ngOnInit(): void {
  }

}
