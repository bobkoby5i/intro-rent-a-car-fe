import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _userservice: UserService, private _router:Router){

  }

  canActivate(): boolean{
    if (this._userservice.loggedIn())  {
      return true;
    } else {
      this._router.navigate(['/login'])
      return false; 
    }
  }
}
