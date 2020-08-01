import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentUploadService {

  constructor(private http:HttpClient) { }
  getS_Uploads(){
    return this.http.get("http://localhost:3000/studentuploads/s_uploads");
  }
  getFilterS_Uploads(filter){
    // console.log("Service");
    // console.log(filter);       
    return this.http.post("http://localhost:3000/studentuploads/filters_uploads",filter);
  }  
  getFilter_T_U_S_Uploads(t_u_filter){
    return this.http.post("http://localhost:3000/studentuploads/filter_t_u_s_uploads",t_u_filter);
  }
  getFilterOwnS_Uploads(user_id){
    return this.http.post("http://localhost:3000/studentuploads/filterowns_uploads",user_id);
  }
  addS_Upload(studentupload){
    return this.http.post("http://localhost:3000/studentuploads/adds_upload", studentupload);
  }  
  editS_Upload(id){
    return this.http.get("http://localhost:3000/studentuploads/edits_upload/"+id);
  }
  deleteS_Upload(id){
    return this.http.get("http://localhost:3000/studentuploads/deletes_upload/"+id);
  }
  updateS_Upload(studentupload){
    return this.http.post("http://localhost:3000/studentuploads/updates_upload",studentupload);
  }
}
