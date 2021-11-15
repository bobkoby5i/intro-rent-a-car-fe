import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { MatDialog } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getConfigFileParsingDiagnostics } from 'typescript';

import { environment } from '../../environments/environment';
let BACKEND_URL = environment.baseUrlBe;  

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: any;
  path: any;
  path_api: any;
  path_uploads: any;
  private unsubscribe = new Subject();  

  constructor(private adminservice: AdminService, private userservice: UserService) { }


  ngOnInit(): void {
    // this.adminservice.getCars().pipe(takeUntil(this.unsubscribe)).subscribe
    this.path_uploads = this.userservice.path_to_images;
    this.path_api     = BACKEND_URL + "/api/photo/";

    console.log(this.path_uploads)
    console.log(this.path_api)
    this.adminservice.getCars().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.cars = res;
    });

  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
    

}
