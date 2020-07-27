import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/auth/register";
  private _loginUrl = "http://localhost:3000/auth/login";


  constructor(private http:HttpClient) { }
  validatePage(){
    return this.http.get("http://localhost:3000/auth/validatepage");
  }
  registerUser(user){
    return this.http.post(this._registerUrl, user);
  }  
  loginUser(user){
    return this.http.post(this._loginUrl, user);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUserType(){
    return localStorage.getItem('type');
  }
  getAdminUsers(){
    return this.http.get("http://localhost:3000/auth/adminusers");
  }
  editUser(id){
    return this.http.get("http://localhost:3000/auth/edituser/"+id);
  }
  deleteUser(id){
    return this.http.get("http://localhost:3000/auth/deleteuser/"+id);
  }
  updateUser(user){
    // console.log("service");    
    return this.http.post("http://localhost:3000/auth/updateuser",user);
  }
  
  // Admin Services
  //Subject Services

  getSubjects(){
    return this.http.get("http://localhost:3000/admin/subjects");
  }
  addSubject(subject){
    return this.http.post("http://localhost:3000/admin/addsubject", subject);
  }  
  editSubject(id){
    return this.http.get("http://localhost:3000/admin/editsubject/"+id);
  }
  deleteSubject(id){
    return this.http.get("http://localhost:3000/admin/deletesubject/"+id);
  }
  updateSubject(subject){
    return this.http.post("http://localhost:3000/admin/updatesubject",subject);
  }  
  //Class Services

  getClasses(){
    return this.http.get("http://localhost:3000/admin/classes");
  }
  addClass(classs){
    return this.http.post("http://localhost:3000/admin/addclasss", classs);
  }  
  editClass(id){
    return this.http.get("http://localhost:3000/admin/editclasss/"+id);
  }
  deleteClass(id){
    return this.http.get("http://localhost:3000/admin/deleteclasss/"+id);
  }
  updateClass(classs){
    return this.http.post("http://localhost:3000/admin/updateclasss",classs);
  }  
}