import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { UserService } from '../services/user.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();
    loginUserData = {email:"", password:""}    
    token: any;


    constructor(private userservice: UserService, private router: Router) { }
        
onLogin(){
    console.log(this.loginUserData.email)
    //const email = this.loginUserData.email;
    //const pass  = this.loginUserData.password;
    this.userservice.userLogin(this.loginUserData).pipe(takeUntil(this.unsubscribe)).subscribe(res =>{
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
        this.userservice.isAdmin.next(authInfo.isAdmin);
        this.router.navigate(['/home'])
    }
}


ngOnInit(): void {

}

 
ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }


}