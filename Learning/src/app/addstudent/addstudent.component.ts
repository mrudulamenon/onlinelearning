import { Component, OnInit } from '@angular/core';
import { StudentModel } from './addstudent.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {

  title: String = "Add Student";
  user = { email: "", password: "", usertype: "student" };
  user_id = "";
  msg = "";
  //for editing
  _id = "";
  if_id="";
  classobjarr = <any>[];


  constructor(private a_route: ActivatedRoute, private _auth: AuthService, private studentService: StudentService, private _route: Router) { 
    this._route.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  public s_classes=[];
  public s_divs=["A","B","C","D"];


  student = new StudentModel(null, null, null, null, null, null, null, null, null);
  usertype = localStorage.getItem("type");

  ngOnInit(): void {
    // this._auth.getAuthentication
    this.validatepage();
    this.isedit();
    // console.log(this.usertype);    
    this.getClasses();

  }
  
  getClasses(){
    
  return this._auth.getClasses()
    .subscribe(
      res => {this.classobjarr = JSON.parse(JSON.stringify(res));
        // for(let i=0;i<this.subobjarr.length;i++){
        //   this.subjects=this.subobjarr["subject"];
        // }
       this.s_classes= this.classobjarr.map(({classs})=>classs);
      console.log(this.classobjarr);
      console.log(this.s_classes);
      return this.s_classes;
      },
      err => {
        console.log(err);
        this.msg = err.error;
      }
      // err => console.log(err)
    );
  }
  isedit() {
    // if (!!this.a_route.params['_id']) {
      if(!!(this.a_route.params.subscribe(params => {
        this.if_id = params['_id'];
      }))){
        this._id=this.if_id;
        this.title = "Edit Student"
      console.log("id" + this._id);
      this.studentService.editStudent(this._id).subscribe((data) => {
        this.student = JSON.parse(JSON.stringify(data));
        //console.log(data);
        //console.log(this.productItem);  
        this.user_id = this.student.user_id;
        this._auth.editUser(this.user_id)
          .subscribe((data) => {
            this.user = JSON.parse(JSON.stringify(data));
            console.log(this.user["_id"]);
            // this.edit_id = this.user["_id"];
          },
            // res=> this.user = res,
            err => {
              console.log(err);
              this.msg = err.error;
            }
          )
      });
    }
    else{
      this._id="";
    }
  }

  validatepage() {
    this._auth.validatePage()
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._route.navigate(['/']);
            }
          }
        }
      )
  }
  AddStudent(newStuForm) {
    console.log(this._id);
    
    if (this._id == null) {

      console.log(this.student);
      this.student.email = this.user.email;
      this._auth.registerUser(this.user)
        .subscribe((data) => {
          this.user = JSON.parse(JSON.stringify(data));
          console.log(data);
          console.log(this.user);
          console.log(this.user["_id"]);
          this.student.user_id = this.user["_id"];
          console.log(this.student);
          //this.user = res;
          // this.user = { email: "", password: "", usertype: "admin" };
          // form.reset();
          // this._route.navigate(['/a_home/admins']);
          this.studentService.addStudent(this.student)
            .subscribe(
              res => {
                console.log(res);
                alert("New student Added");
                newStuForm.resetForm();
                // this._route.navigate(['/a_home/admins']);
                if (this.usertype == 'admin') {
                  this._route.navigate(['/a_home/s_details']);
                }
                else if (this.usertype == 'teacher') {
                  this._route.navigate(['/t_home/s_details']);
                }
              },
              err => {
                console.log(err);
                this.msg = err.error;
                newStuForm.resetForm();
              }
            );
        },
          err => {
            console.log(err);
            this.msg = err.error;
            newStuForm.resetForm();
          }
        );
      console.log("called add");
    }
    else {
      console.log(this.student);
      this.student.email = this.user.email;
      this._auth.updateUser(this.user)
        .subscribe((data) => {
          this.user = JSON.parse(JSON.stringify(data));
          console.log(data);
          console.log(this.user);
          console.log(this.user["_id"]);
          this.student.user_id = this.user["_id"];
          console.log(data);
          //this.user = res;
          // this.user = { email: "", password: "", usertype: "admin" };
          // form.reset();
          // this._route.navigate(['/a_home/admins']);
          this.studentService.updateStudent(this.student)
            .subscribe(
              res => {
                console.log(res);
                alert("Student Details Updated");
                newStuForm.resetForm();
                // this._route.navigate(['/a_home/admins']);
                if (this.usertype == 'admin') {
                  this._route.navigate(['/a_home/s_details']);
                }
                else if (this.usertype == 'teacher') {
                  this._route.navigate(['/t_home/s_details']);
                }
              },
              err => {
                console.log(err);
                this.msg = err.error;
                newStuForm.resetForm();
              }
            );
        },
          err => {
            console.log(err);
            this.msg = err.error;
            newStuForm.resetForm();
          }
        );
      console.log("called update");
    }
  }
}
