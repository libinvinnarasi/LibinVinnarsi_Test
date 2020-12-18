import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileToUpload: File = null;
  uploadForm:FormGroup;
  fileData: File = null;
  photopreviewUrl:any = null;
  cerpreviewUrl:any = null;
  resumepreviewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private formBuilder: FormBuilder,private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({           
      certificate: [''],
      photo: [''],
      resume: ['']      
  });
}
  fileProgress(fileInput: any,key:any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview(key);
}

preview(key) {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 

    if(key ==='Photo'){
    this.photopreviewUrl = reader.result;      
    }
    if(key ==='certificate'){
      this.cerpreviewUrl = reader.result; 
    }
    if(key ==='resume'){
      this.resumepreviewUrl = reader.result; 
    }
  }
}
 
onSubmit() {
  const formData = new FormData();
  formData.append('files', this.fileData);
   
  this.fileUploadProgress = '0%';

  this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
    reportProgress: true,
    observe: 'events'   
  })
  .subscribe(events => {
    if(events.type === HttpEventType.UploadProgress) {
      this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.fileUploadProgress);
    } else if(events.type === HttpEventType.Response) {
      this.fileUploadProgress = '';
      console.log(events.body);          
      alert('SUCCESS !!');
    }
       
  }) 
     
}

}
