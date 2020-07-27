import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../addstudent/addstudent.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnInit {
  title: String = "Student List";
  //Student is the model for a student item
  students: StudentModel[];
  //creating service object for calling getStudents()
  constructor(private _auth: AuthService, private studentService: StudentService, private _route: Router) { }
  
  loggedIn(){
    return this._auth.loggedIn();
  }
 
  ngOnInit(): void {
    //calling getStudents() and loading the students to students array
    this.studentService.getStudents()
      .subscribe((data) => {
        this.students = JSON.parse(JSON.stringify(data));
        //console.log("Pro"+this.students[0]._id);
        //console.log("data"+data[0]._id);      
      })
  }
  getuserhome(){
    let type= localStorage.getItem('type');
    if(type=='admin'){return 'a_home';}
    else if(type=='teacher'){return 't_home';}
  }
  deleteStudent(id): void {
    if (window.confirm("Are you sure you want to delete?")){
      this.studentService.deleteStudent(id)
        .subscribe((data) => {
          this.students = JSON.parse(JSON.stringify(data));
          // console.log("deleted" + data);
          // this.router.navigate(['/']);
        });
    }
    else{
      this._route.navigate(['/']);
    }
  }
}
