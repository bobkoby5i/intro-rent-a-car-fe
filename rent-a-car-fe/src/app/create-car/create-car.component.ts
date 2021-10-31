import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AdminService } from '../services/admin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let BE_URL = environment.baseUrlBe;
let _baseUrlFe = environment.baseUrlFe;  

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit, OnDestroy {
  
  selectedFile: File;
  fd: any;
  
    private unsubscribe = new Subject();

  constructor(private http: HttpClient, private adminservice: AdminService) { }

  ngOnInit(): void {
  }


  onFileSelected(event: any) {
    console.log(event);
    this.fd = new FormData();
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    console.log(this.selectedFile.name );
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    console.log(this.fd)
    
    this.http.post(BE_URL + '/api/admin/save-image',this.fd).pipe(takeUntil(this.unsubscribe)).subscribe(res => console.log(res))
    this.http.post('http://localhost:8080/file/upload',this.fd).pipe(takeUntil(this.unsubscribe)).subscribe(res => console.log(res))
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  onCreate(createform: NgForm){
    const filename = this.selectedFile.name;
    console.log("saving file: " + filename)
    this.adminservice.createCar(createform.value.brand, 
      createform.value.model, 
      createform.value.power, 
      createform.value.seats, 
      filename).pipe(takeUntil(this.unsubscribe)).subscribe(
      res => console.log(res)
    );
    createform.resetForm();
  }  
}
