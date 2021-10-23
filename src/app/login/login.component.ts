import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from '../services/user.service'


@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    constructor(private userservice: UserService) { }
        
onLogin(loginform: NgForm){
    console.log(loginform.value.email)
    const email = loginform.value.email;
    const pass = loginform.value.password;
    this.userservice.userLogin(email, pass).subscribe(res =>{
        console.log(res);
    })
}



ngOnInit(): void {
}
}