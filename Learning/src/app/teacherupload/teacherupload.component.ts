import { Component, OnInit } from '@angular/core';
import { TeacherUploadModel } from '../add-t-upload/teacherupload.model';
import { TeacherUploadService } from '../teacher-upload.service';
import { StudentModel } from '../addstudent/addstudent.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-teacherupload',
  templateUrl: './teacherupload.component.html',
  styleUrls: ['./teacherupload.component.css']
})
export class TeacheruploadComponent implements OnInit {

  title: String = "Teacher Uploads";
  t_uploads: TeacherUploadModel[];
  public filter = { classs: "", subjects: "" };
  classobjarr = <any>[];
  subobjarr = <any>[];
  public classlist = [];
  msg = "";
  subjectlist = [];
  _id = "";
  user_id = "";
  s_class = "";
  usertype = localStorage.getItem('type');
  constructor(private _auth: AuthService, private studentService: StudentService, private t_uploadService: TeacherUploadService, private _route: Router) { }

  loggedIn() {
    return this._auth.loggedIn();
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.getClasses();
    this.getSubjects();
    if (this.usertype == "student") {
      this.getStuClass();
    } else
      if (this.filter.classs == "" && this.filter.subjects == "") {
        this.getT_Uploads();
      }
      else {
        this.filterlist();
      }
  }
  filterClassList() {
    console.log(this.filter);    
    this.t_uploadService.getFilterClassT_Uploads(this.filter)
      .subscribe((data) => {
        this.t_uploads = JSON.parse(JSON.stringify(data));
      });
  }
  getStuClass() {
    if (this.usertype == "student") {
      this.studentService.getStudentWithUserId(this.user_id).subscribe((data) => {
        this.s_class = data['s_class'];
        this.filter.classs = data['s_class'];
        this.filterClassList();
      });
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

  getSubjects() {
    return this._auth.getSubjects()
      .subscribe(
        res => {
          this.subobjarr = JSON.parse(JSON.stringify(res));
          this.subjectlist = this.subobjarr.map(({ subject }) => subject);
          return this.subjectlist;
        },
        err => {
          console.log(err);
          this.msg = "No Subjects to Display";
        }
        // err => console.log(err)
      );
  }

  getT_Uploads() {
    this.t_uploadService.getT_Uploads()
      .subscribe((data) => {
        this.t_uploads = JSON.parse(JSON.stringify(data));
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
          this.msg = "No class to display";
        }
        // err => console.log(err)
      );
  }
  filterlist() {
    this.t_uploadService.getFilterT_Uploads(this.filter)
      .subscribe((data) => {
        this.t_uploads = JSON.parse(JSON.stringify(data));
      });
  }
  getuserhome() {
    let type = localStorage.getItem('type');
    if (type == 'admin') { return 'a_home'; }
    else if (type == 'teacher') { return 't_home'; }
  }
  deleteT_Upload(id): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.t_uploadService.deleteT_Upload(id)
        .subscribe((data) => {
          this.t_uploads = JSON.parse(JSON.stringify(data));
          // this.router.navigate(['/']);
        });
    }
  }

}
