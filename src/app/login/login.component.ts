import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";


@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
onlogin(loginform: NgForm){
    console.log(loginform.value.email)
}
}