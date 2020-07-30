import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherUploadService {

  constructor(private http:HttpClient) { }
  getT_Uploads(){
    return this.http.get("http://localhost:3000/teacheruploads/t_uploads");
  }
  getFilterT_Uploads(filter){
    console.log("Service");
    console.log(filter);   
    
    return this.http.post("http://localhost:3000/student/filtert_uploads",filter);
  }
  
  addT_Upload(teacherupload){
    return this.http.post("http://localhost:3000/teacheruploads/addt_upload", teacherupload);
  }  
  editT_Upload(id){
    return this.http.get("http://localhost:3000/teacheruploads/editt_upload/"+id);
  }
  deleteT_Upload(id){
    return this.http.get("http://localhost:3000/teacheruploads/deletet_upload/"+id);
  }
  updateT_Upload(teacherupload){
    return this.http.post("http://localhost:3000/teacheruploads/updatet_upload",teacherupload);
  }
}
