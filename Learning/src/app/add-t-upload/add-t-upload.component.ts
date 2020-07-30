import { Component, OnInit } from '@angular/core';
import { TeacherUploadModel } from './teacherupload.model';
import { TeacherUploadService } from '../teacher-upload.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-add-t-upload',
  templateUrl: './add-t-upload.component.html',
  styleUrls: ['./add-t-upload.component.css']
})
export class AddTUploadComponent implements OnInit {

  title1: String = "Add Teacher Upload";

  constructor(private a_route: ActivatedRoute, private _auth: AuthService, private teacherUploadService: TeacherUploadService, private _route: Router) {
    this._route.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  user_id = localStorage.getItem("user_id");
  msg = "";
  _id = "";  //for editing
  classobjarr = <any>[];
  subobjarr = <any>[];
  classlist = [];
  subjectlist = [];
  categorylist = ["Video Tutorial","Work Sheet","Assignment"];
  t_upload = new TeacherUploadModel(null, null, null, null, null, null, null, null, null);
  usertype = localStorage.getItem("type");
  dropdownList1 = [];
  selectedItems1 = [];
  dropdownSettings1: IDropdownSettings = {};

  ngOnInit(): void {
    // this._auth.getAuthentication
    this.validatepage();
    this.t_upload.t_u_date=new Date();
    // console.log(this.t_upload.t_u_date);
    
    this.isedit();
    
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true
    };
    this.getClasses();
    this.getSubjects();
  }
  getSubjects() {
    return this._auth.getSubjects()
      .subscribe(
        res => {
          this.subobjarr = JSON.parse(JSON.stringify(res));
          this.subjectlist = this.subobjarr.map(({ subject }) => subject);
          console.log(this.subobjarr);
          console.log(this.subjectlist);
          this.dropdownList1 = this.subjectlist;
          return this.subjectlist;
        },
        err => {
          console.log(err);
          this.msg = err.error;
        }
        // err => console.log(err)
      );
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems1);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getClasses() {

    return this._auth.getClasses()
      .subscribe(
        res => {
          this.classobjarr = JSON.parse(JSON.stringify(res));
          this.classlist = this.classobjarr.map(({ classs }) => classs);
          console.log(this.classobjarr);
          console.log(this.classlist);
          this.dropdownList1 = this.classlist;
          return this.classlist;
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
    if (!!(this.a_route.params.subscribe(params => {
      this._id = params['_id'];
    }))) {
      console.log("id" + this._id);
      this.teacherUploadService.editT_Upload(this._id).subscribe((data) => {
        this.t_upload = JSON.parse(JSON.stringify(data));
        //console.log(data);        
      });
    }
    else {
      this._id = "";
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
  AddT_Upload(newTcrUpldForm) {
    console.log(this._id);
    if (this._id == null) {
      console.log(this.t_upload);
      this.teacherUploadService.addT_Upload(this.t_upload)
        .subscribe(
          res => {
            console.log(res);
            alert("New Upload Added");
            newTcrUpldForm.resetForm();
            if (this.usertype == 'admin') {
              this._route.navigate(['/a_home/t_upload']);
            }
            else if (this.usertype == 'teacher') {
              this._route.navigate(['/t_home/t_upload']);
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
      console.log(this.t_upload);
      this.teacherUploadService.updateT_Upload(this.t_upload)
        .subscribe(
          res => {
            console.log(res);
            alert("Teacher Upload Updated");
            newTcrUpldForm.resetForm();
            if (this.usertype == 'admin') {
              this._route.navigate(['/a_home/t_upload']);
            }
            else if (this.usertype == 'teacher') {
              this._route.navigate(['/t_home/t_upload']);
            }
          },
          err => {
            console.log(err);
            this.msg = err.error;
            newTcrUpldForm.resetForm();
          }
        );
      console.log("called update");
    }
  }
}
