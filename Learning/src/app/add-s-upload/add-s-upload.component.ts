import { Component, OnInit } from '@angular/core';
import { StudentUploadModel } from './studentupload.model';
import { StudentUploadService } from '../student-upload.service';
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

  constructor(private a_route: ActivatedRoute, private _auth: AuthService, private studentUploadService: StudentUploadService, private _route: Router) {
    this._route.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  user_id = localStorage.getItem("user_id");
  msg = "";
  _id = "";  //for editing
  // classobjarr = <any>[];
  // subobjarr = <any>[];
  // classlist = [];
  // subjectlist = [];
  // categorylist = ["Video Tutorial","Work Sheet","Assignment"];
  s_upload = new StudentUploadModel(null, null, null, null, null,null);
  usertype = localStorage.getItem("type");
  // dropdownList1 = [];
  // selectedItems1 = [];
  // dropdownSettings1: IDropdownSettings = {};

  ngOnInit(): void {
    // this._auth.getAuthentication
    this.validatepage();
    this.s_upload.s_u_date=new Date();

    this.isedit();
    // this.dropdownSettings1 = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 7,
    //   allowSearchFilter: true
    // };
    // this.getClasses();
    // this.getSubjects();
  }
  // getSubjects() {
  //   return this._auth.getSubjects()
  //     .subscribe(
  //       res => {
  //         this.subobjarr = JSON.parse(JSON.stringify(res));
  //         this.subjectlist = this.subobjarr.map(({ subject }) => subject);
  //         console.log(this.subobjarr);
  //         console.log(this.subjectlist);
  //         this.dropdownList1 = this.subjectlist;
  //         return this.subjectlist;
  //       },
  //       err => {
  //         console.log(err);
  //         this.msg = err.error;
  //       }
  //       // err => console.log(err)
  //     );
  // }
  // onItemSelect(item: any) {
  //   console.log(item);
  //   console.log(this.selectedItems1);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }

  // getClasses() {

  //   return this._auth.getClasses()
  //     .subscribe(
  //       res => {
  //         this.classobjarr = JSON.parse(JSON.stringify(res));
  //         this.classlist = this.classobjarr.map(({ classs }) => classs);
  //         console.log(this.classobjarr);
  //         console.log(this.classlist);
  //         this.dropdownList1 = this.classlist;
  //         return this.classlist;
  //       },
  //       err => {
  //         console.log(err);
  //         this.msg = err.error;
  //       }
  //       // err => console.log(err)
  //     );
  // }
  isedit() {
    // if (!!this.a_route.params['_id']) {
    if (!!(this.a_route.params.subscribe(params => {
      this._id = params['_id'];
    }))) {
      console.log("id" + this._id);
      this.studentUploadService.editS_Upload(this._id).subscribe((data) => {
        this.s_upload = JSON.parse(JSON.stringify(data));
        //console.log(data);        
      });
    }
    else {
      this._id = "";
    }
  }
  IfStudent(){
    if(this.usertype=='student'){
      return true;
    }
    else{
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
    if (this._id == null) {
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
