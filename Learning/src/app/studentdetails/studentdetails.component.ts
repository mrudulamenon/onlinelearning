import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../addstudent/addstudent.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';



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
  public filter = { s_class: "", s_div: "" };
  classobjarr = <any>[];
  public classlist = [];
  msg = "";
  s_divs = ["A", "B", "C", "D"];

  constructor(private _auth: AuthService, private studentService: StudentService, private _route: Router) { }

  loggedIn() {
    return this._auth.loggedIn();
  }

  ngOnInit(): void {

    //calling getStudents() and loading the students to students array
    this.getClasses();
    if (this.filter.s_class == "" && this.filter.s_div == "") {
      this.getStudents();
    }
    else {
      this.filterlist();
    }
  }
  getStudents() {
    this.studentService.getStudents()
      .subscribe((data) => {
        this.students = JSON.parse(JSON.stringify(data));
        //console.log("Pro"+this.students[0]._id);
        //console.log("data"+data[0]._id);      
      });

  }

  getClasses() {
    this._auth.getClasses()
      .subscribe(
        res => {
          this.classobjarr = JSON.parse(JSON.stringify(res));
          // for(let i=0;i<this.subobjarr.length;i++){
          // this.subjects=this.subobjarr["subject"];
          // }
          this.classlist = this.classobjarr.map(({ classs }) => classs);
          console.log(this.classobjarr);
          console.log(this.classlist);
          // this.dropdownList1 = this.classlist;
          return this.classlist;
        },
        err => {
          console.log(err);
          this.msg = err.error;
        }
        // err => console.log(err)
      );
  }
  filterlist() {
    console.log("filter");
    console.log(this.filter);
    this.studentService.getFilterStu(this.filter)
      .subscribe((data) => {
        this.students = JSON.parse(JSON.stringify(data));
      });
  }
  getuserhome() {
    let type = localStorage.getItem('type');
    if (type == 'admin') { return 'a_home'; }
    else if (type == 'teacher') { return 't_home'; }
  }
  deleteStudent(id): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.studentService.deleteStudent(id)
        .subscribe((data) => {
          this.students = JSON.parse(JSON.stringify(data));
          // console.log("deleted" + data);
          // this.router.navigate(['/']);
        });
    }
    else {
      this._route.navigate(['/']);
    }
  }
}
