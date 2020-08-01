import { Component, OnInit } from '@angular/core';
import { StudentUploadModel } from './studentupload.model';
import { StudentUploadService } from '../student-upload.service';
import { StudentModel } from '../addstudent/addstudent.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-s-upload',
  templateUrl: './add-s-upload.component.html',
  styleUrls: ['./add-s-upload.component.css']
})
export class AddSUploadComponent implements OnInit {

  title1: String = "Add Student Upload";

  constructor(private a_route: ActivatedRoute, private studentService: StudentService, private _auth: AuthService, private studentUploadService: StudentUploadService, private _route: Router) {
    this._route.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  user_id = localStorage.getItem("user_id");
  msg = "";
  _id = "";  //for editing
  s_upload = new StudentUploadModel(null, null, null, null, null, null, null, null);
  // student: StudentModel[];
  student = new StudentModel(null, null, null, null, null, null, null, null, null);

  usertype = localStorage.getItem("type");

  ngOnInit(): void {
    // this._auth.getAuthentication
    this.validatepage();
    this.s_upload.user_id = this.user_id;
    this.a_route.params.subscribe(params => {
      this.s_upload.t_upload_id = params['t_u_id'];
    });
    //Setting Date
    this.s_upload.s_u_date = new Date();
    //Setting Class and Division
    if (this.usertype == "student") {
      this.studentService.getStudentWithUserId(this.user_id).subscribe((data) => {
        this.s_upload.s_u_class = data['s_class'];
        this.s_upload.s_u_div = data['s_div'];
      });
    }
    else {
      this.s_upload.s_u_class = 'Nill';
      this.s_upload.s_u_div = 'Nill';
    }
    //Calling isedit
    this.isedit();
  }
  isedit() {    
    this.a_route.params.subscribe(params => {
      this._id = params['_id'];
      // console.log("id");
      // console.log(this._id);      
    });
    if (this._id != undefined) {
      this.studentUploadService.editS_Upload(this._id).subscribe((data) => {
        this.s_upload = JSON.parse(JSON.stringify(data));
        // console.log(data);        
        this.title1="Edit Student Upload";
      });
    }
    else {
      this._id = "";
    }
  }
  IfStudent() {
    if (this.usertype == 'student') {
      return true;
    }
    else {
      return false;
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
  AddS_Upload(newStuUpldForm) {
    console.log(this._id);
    if (this._id == "") {
      console.log(this.s_upload);
      this.studentUploadService.addS_Upload(this.s_upload)
        .subscribe(
          res => {
            console.log(res);
            alert("New Upload Added");
            newStuUpldForm.resetForm();
            if (this.usertype == 'admin') {
              this._route.navigate(['/a_home/s_upload']);
            }
            else if (this.usertype == 'teacher') {
              this._route.navigate(['/t_home/s_upload']);
            }
            else if (this.usertype == 'student') {
              this._route.navigate(['/s_home/s_upload']);
            }
          },
          err => {
            console.log(err);
            this.msg = err.error;
          }
        );
      console.log("called add");
    }
    else {
      console.log(this.s_upload);
      this.studentUploadService.updateS_Upload(this.s_upload)
        .subscribe(
          res => {
            console.log(res);
            alert("Student Upload Updated");
            newStuUpldForm.resetForm();
            if (this.usertype == 'admin') {
              this._route.navigate(['/a_home/s_upload']);
            }
            else if (this.usertype == 'teacher') {
              this._route.navigate(['/t_home/s_upload']);
            }
            else if (this.usertype == 'student') {
              this._route.navigate(['/s_home/s_upload']);
            }
          },
          err => {
            console.log(err);
            this.msg = err.error;
            newStuUpldForm.resetForm();
          }
        );
      console.log("called update");
    }
  }

}
