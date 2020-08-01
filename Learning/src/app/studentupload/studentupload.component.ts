import { Component, OnInit } from '@angular/core';
import { StudentUploadModel } from '../add-s-upload/studentupload.model';
import { StudentUploadService } from '../student-upload.service';
import { StudentModel } from '../addstudent/addstudent.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-studentupload',
  templateUrl: './studentupload.component.html',
  styleUrls: ['./studentupload.component.css']
})
export class StudentuploadComponent implements OnInit {


  title: String = "Student Uploads";
  s_uploads: StudentUploadModel[];
  public filter = { classs: "" };
  // filter = <any>{};
  classobjarr = <any>[];
  subobjarr = <any>[];
  public classlist = [];
  msg = "";
  subjectlist = [];
  _id = "";
  user_id = localStorage.getItem('user_id');
  usertype = localStorage.getItem('type');
  ownfilter = { user_id: this.user_id };
  t_u_filter = { t_u_id: "" };
  constructor(private a_route: ActivatedRoute, private _auth: AuthService, private studentService: StudentService, private s_uploadService: StudentUploadService, private _route: Router) { }

  loggedIn() {
    return this._auth.loggedIn();
  }

  ngOnInit(): void {
    this.getClasses();
    this.getSubjects();
    this.a_route.params.subscribe(params => {
      this.t_u_filter.t_u_id = params['t_u_id'];
    });
    if (this.t_u_filter.t_u_id != undefined) {
      console.log("if filTUp");
      
      this.filterTUpload();
    }
    else if (this.usertype == "student") {
      this.filterOwnList();
    } else
      if (this.filter.classs == "") {
        this.getS_Uploads();
      }
      else {
        this.filterlist();
      }
  }
  filterTUpload() {
    console.log("if filTUp");
    this.s_uploadService.getFilter_T_U_S_Uploads(this.t_u_filter)
    .subscribe((data) => {
      this.s_uploads = JSON.parse(JSON.stringify(data));
    });

  }
  filterOwnList() {
    // console.log(this.user_id);
    this.s_uploadService.getFilterOwnS_Uploads(this.ownfilter)
      .subscribe((data) => {
        this.s_uploads = JSON.parse(JSON.stringify(data));
      });
  }
  IfStudent() {
    if (this.usertype == 'student') {
      return true;
    }
    else {
      return false;
    }
  }

  getSubjects() {
    return this._auth.getSubjects()
      .subscribe(
        res => {
          this.subobjarr = JSON.parse(JSON.stringify(res));
          this.subjectlist = this.subobjarr.map(({ subject }) => subject); return this.subjectlist;
        },
        err => {
          console.log(err);
          this.msg = err.error;
        }
        // err => console.log(err)
      );
  }

  getS_Uploads() {
    this.s_uploadService.getS_Uploads()
      .subscribe((data) => {
        this.s_uploads = JSON.parse(JSON.stringify(data));
      });

  }

  getClasses() {
    this._auth.getClasses()
      .subscribe(
        res => {
          this.classobjarr = JSON.parse(JSON.stringify(res));
          this.classlist = this.classobjarr.map(({ classs }) => classs);
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
    this.s_uploadService.getFilterS_Uploads(this.filter)
      .subscribe((data) => {
        this.s_uploads = JSON.parse(JSON.stringify(data));
      });
  }
  getuserhome() {
    let type = localStorage.getItem('type');
    if (type == 'admin') { return 'a_home'; }
    else if (type == 'teacher') { return 't_home'; }
    else if (type == 'student') { return 's_home'; }
  }
  deleteS_Upload(id): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.s_uploadService.deleteS_Upload(id)
        .subscribe((data) => {
          this.s_uploads = JSON.parse(JSON.stringify(data));
        });
    }
    // else {
    //   this._route.navigate(['/'+this.getuserhome]);
    // }
  }
}
