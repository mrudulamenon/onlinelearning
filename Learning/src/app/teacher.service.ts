import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http:HttpClient) { }
  getTeachers(){
    return this.http.get("http://localhost:3000/teacher/teachers");
  }
  addTeacher(teacher){
    return this.http.post("http://localhost:3000/teacher/addteacher", teacher);
  }  
  editTeacher(id){
    return this.http.get("http://localhost:3000/teacher/editteacher/"+id);
  }
  deleteTeacher(id){
    return this.http.get("http://localhost:3000/teacher/deleteteacher/"+id);
  }
  updateTeacher(teacher){
    return this.http.post("http://localhost:3000/teacher/updateteacher",teacher);
  }
}
