import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { UserService } from '../services/user.service'


@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    token: any;

    constructor(private userservice: UserService, private router: Router) { }
        
onLogin(loginform: NgForm){
    console.log(loginform.value.email)
    const email = loginform.value.email;
    const pass = loginform.value.password;
    this.userservice.userLogin(email, pass).subscribe(res =>{
        console.log(res);
        const isAdmin = res.admin;
        const token = res.token;
        const expiresIn = res.expiresIn;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresIn * 1000);
        this.userservice.isAuthenticated.next(true);
        this.userservice.isAdmin.next(isAdmin);
        if (token) {
            this.userservice.saveUserData(token, expirationDate, isAdmin);
            this.userservice.setTimer(expiresIn)
            this.router.navigate(['/register'])
        }
 
    })
}

autoAuthUser(){
    const authInfo = this.userservice.getUserData();
    if (!authInfo) {
        return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn >0 ) {
        this.token = authInfo.token;
        this.userservice.isAuthenticated.next(true);
    }
}


ngOnInit(): void {
}


}