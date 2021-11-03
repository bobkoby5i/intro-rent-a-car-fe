import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

   //has some issues with is why we use below method. Maybe fixed in new Angular. 
   // method with Injector works for me in intro-events
   //constructor(private authService: UserService) { }
  constructor(private injector: Injector) { }


  intercept(req: any, next: any){
    let authService = this.injector.get(UserService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}` // append actual token from local storage

      }
    })
    return next.handle(tokenizedReq)
  }

}
