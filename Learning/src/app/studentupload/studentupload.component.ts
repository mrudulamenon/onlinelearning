import { Component, OnInit } from '@angular/core';
import { StudentUploadModel } from '../add-s-upload/studentupload.model';
import { StudentUploadService } from '../student-upload.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-studentupload',
  templateUrl: './studentupload.component.html',
  styleUrls: ['./studentupload.component.css']
})
export class StudentuploadComponent implements OnInit {


  title: String = "Student Uploads";
  s_uploads: StudentUploadModel[];
  public filter = { classs: "", subjects: "" };
  // filter = <any>{};
  classobjarr = <any>[];
  subobjarr = <any>[];
  public classlist = [];
  msg = "";
  subjectlist = [];
  _id = "";
  user_id = "";
  constructor(private _auth: AuthService, private s_uploadService: StudentUploadService, private _route: Router) { }

  loggedIn() {
    return this._auth.loggedIn();
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.getClasses();
    this.getSubjects();

    if (this.filter.classs == "" && this.filter.subjects == "") {
      this.getS_Uploads();
    }
    else {
      this.filterlist();
    }
  }
  getSubjects() {
    return this._auth.getSubjects()
      .subscribe(
        res => {
          this.subobjarr = JSON.parse(JSON.stringify(res));
          this.subjectlist = this.subobjarr.map(({ subject }) => subject);
          console.log(this.subobjarr);
          console.log(this.subjectlist);
          // this.dropdownList1 = this.subjectlist;
          return this.subjectlist;
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
    this.s_uploadService.getFilterS_Uploads(this.filter)
      .subscribe((data) => {
        this.s_uploads = JSON.parse(JSON.stringify(data));
      });
  }
  getuserhome() {
    let type = localStorage.getItem('type');
    if (type == 'admin') { return 'a_home'; }
    else if (type == 'teacher') { return 't_home'; }
  }
  deleteS_Upload(id): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.s_uploadService.deleteS_Upload(id)
        .subscribe((data) => {
          this.s_uploads = JSON.parse(JSON.stringify(data));
          // console.log("deleted" + data);
          // this.router.navigate(['/']);
        });
    }
    else {
      this._route.navigate(['/']);
    }
  }

}
