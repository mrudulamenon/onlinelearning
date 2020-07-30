import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  getStudents(){
    return this.http.get("http://localhost:3000/student/students");
  }
  getFilterStu(filter){
    // console.log("Service");
    // console.log(filter);
    return this.http.post("http://localhost:3000/student/filterstudents",filter);
  }
  addStudent(student){
    return this.http.post("http://localhost:3000/student/addstudent", student);
  }
  editStudent(id){
    return this.http.get("http://localhost:3000/student/editstudent/"+id);
  }
  deleteStudent(id){
    return this.http.get("http://localhost:3000/student/deletestudent/"+id);
  }
  updateStudent(student){
    return this.http.post("http://localhost:3000/student/updatestudent",student);
  }
  getStudentWithUserId(user_id){
    return this.http.get("http://localhost:3000/student/getstudent/"+user_id);
  }
}
