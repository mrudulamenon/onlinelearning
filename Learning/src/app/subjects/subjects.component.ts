import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  title = "Subjects";
  newsubject = { subject:"" };
  subjects = <any>[];
  edit_id = "";
  msg = "";
  MyValue = false;

  constructor(private _auth: AuthService, private _route: Router) { }
  ngOnInit(): void {
    this._auth.getSubjects()
      .subscribe(
        res => this.subjects = res,
        // err => console.log(err)
      )
    err => {
      console.log(err);
      this.msg = err.error;
    }
    // .subscribe((data)=>{
    //   // this.subjects = JSON.parse(JSON.stringify(data));
    // });
  }
  addSubject() {
    // this.subject = { subject: "" };
    this.MyValue = true;
  }

  submitSubject(subjectform: NgForm) {
    console.log(this.newsubject);
    
    if (this.edit_id == "") {
      console.log(this.newsubject);
      this._auth.addSubject(this.newsubject)
        .subscribe(
          res => {
            console.log(res);
            alert("New subject Added");
            subjectform.resetForm();
            this._auth.getSubjects()
            .subscribe(     
              res=> this.subjects = res,
              err=> console.log(err)
              )
            // this.subject = {subject: "" };
            // form.reset();
            // this._route.navigate(['/a_home/admins']);
          },
          err => {
            console.log(err);
            this.msg = err.error;
            subjectform.resetForm();
          }
        );
    }
    else {
      this._auth.updateSubject(this.newsubject)
        .subscribe(
          res => {
            console.log(res);
            this.edit_id = "";
            alert("Subject Updated");
            subjectform.resetForm();
            this._auth.getSubjects()
            .subscribe(     
              res=> this.subjects = res,
              err=> console.log(err)
              )
          },
          err => {
            console.log(err);
            this.msg = err.error;
          })
    }
  }

  editSubject() {
    let id = localStorage.getItem("SubjectId");
    this.MyValue = true;
    this._auth.editSubject(id)
      .subscribe((data) => {
        this.newsubject = JSON.parse(JSON.stringify(data));
      },
        // res=> this.subject = res,
        err => {
          console.log(err);
          // this.msg = err.error;
        }
      )
  }

  deleteSubject(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      this._auth.deleteSubject(id)
        .subscribe(
          res => {
                this._auth.getSubjects()
            .subscribe(     
              res=> this.subjects = res,
              err=> console.log(err)
              )
            // this._route.navigate(['/a_home/admins']);
          },
          err => {
            console.log(err);
            this.msg = err.error;
          })
    }
  }

}
