import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../addstudent/addstudent.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit {
  viewuser = { user_id: "" };
  usertype = ""
  user = <any>{};
  student = <any>{};

  constructor(private a_route: ActivatedRoute, private _auth: AuthService, private studentService: StudentService, private _route: Router) { }

  ngOnInit(): void {
    this.a_route.params.subscribe(params => {
      this.viewuser.user_id = params['user_id'];
    });
    if (this.viewuser.user_id != undefined) {
      this.getData();
    }
  }
  getData() {
    this._auth.editUser(this.viewuser.user_id)
      .subscribe((data) => {
        this.user = JSON.parse(JSON.stringify(data));
        console.log(this.user["_id"]);
        this.usertype = this.user["usertype"];
        this.getUserDetails();
      },
        // res=> this.user = res,
        err => {
          console.log(err);
          // this.msg = err.error;
        }
      )
  }
  getUserDetails() {
    if (this.usertype == 'student') {
      this.studentService.getStudentWithUserId(this.viewuser.user_id)
        .subscribe((data) => {
          this.student = data;
          // this.user.s_u_class = data['s_class'];
          // this.s_upload.s_u_div = data['s_div'];
        });
    }
  }
  getUserType(){
    return this.usertype;
  }
}
