import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../environments/environment';

let BE_URL = environment.baseUrlBe;
let _baseUrlFe = environment.baseUrlFe;  

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {
  
  selectedFile: File;
  fd = new FormData();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onCreate(createform: NgForm){
    console.log(createform.value.brand)
  }  

  onFileSelected(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    console.log(this.selectedFile.name );
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post(BE_URL + '/api/admin/saveimage',this.fd).subscribe(res => console.log(res))
  }
}
