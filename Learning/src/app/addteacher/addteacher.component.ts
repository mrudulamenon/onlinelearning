import { Component, OnInit } from '@angular/core';
import { TeacherModel } from './addteacher.model';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.css']
})
export class AddteacherComponent implements OnInit {

  title: String = "Add Teacher";
  user = { email: "", password: "", usertype: "teacher" };
  user_id = "";
  msg = "";
  //for editing
  _id = "";
  classobjarr = <any>[];
  dropdownList1 = [];
  selectedItems1 = [];
  dropdownSettings1: IDropdownSettings = {};
  subobjarr = <any>[];
  dropdownList2 = [];
  selectedItems2 = [];
  dropdownSettings2: IDropdownSettings = {};

  constructor(private a_route: ActivatedRoute, private _auth: AuthService, private teacherService: TeacherService, private _route: Router) {
    this._route.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  // public t_classteacherof = [];
  t_classlist = [];
  public t_divs = ["A", "B", "C", "D"];
  public subjects = [];

  teacher = new TeacherModel(null, null, null, null, null, null, null, null, null, null, null);
  usertype = localStorage.getItem("type");

  ngOnInit(): void {
    // this._auth.getAuthentication
    this.validatepage();
    this.isedit();
    // console.log(this.usertype);    
    this.selectedItems1 = [];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
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
          // for(let i=0;i<this.subobjarr.length;i++){
          //   this.subjects=this.subobjarr["subject"];
          // }
          this.subjects = this.subobjarr.map(({ subject }) => subject);
          console.log(this.subobjarr);
          console.log(this.subjects);
          this.dropdownList2 = this.subjects;
          return this.subjects;
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
          // for(let i=0;i<this.subobjarr.length;i++){
          //   this.subjects=this.subobjarr["subject"];
          // }
          this.t_classlist = this.classobjarr.map(({ classs }) => classs);
          console.log(this.classobjarr);
          console.log(this.t_classlist);
          this.dropdownList1 = this.t_classlist;
          return this.t_classlist;
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
      this.teacherService.editTeacher(this._id).subscribe((data) => {
        this.teacher = JSON.parse(JSON.stringify(data));
        //console.log(data);
        //console.log(this.productItem);  
        this.user_id = this.teacher.user_id;
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
  AddTeacher(newTcrForm) {
    console.log(this._id);

    if (this._id == null) {

      console.log(this.teacher);
      this.teacher.email = this.user.email;
      console.log(this.user);
      this._auth.registerUser(this.user)
        .subscribe((data) => {
          this.user = JSON.parse(JSON.stringify(data));
          console.log(data);
          console.log(this.user);
          console.log(this.user["_id"]);
          this.teacher.user_id = this.user["_id"];
          console.log(this.teacher);
          //this.user = res;
          // this.user = { email: "", password: "", usertype: "admin" };
          // form.reset();
          // this._route.navigate(['/a_home/admins']);
          this.teacherService.addTeacher(this.teacher)
            .subscribe(
              res => {
                console.log(res);
                alert("New teacher Added");
                newTcrForm.resetForm();
                // this._route.navigate(['/a_home/admins']);
                if (this.usertype == 'admin') {
                  this._route.navigate(['/a_home/t_details']);
                }
                else if (this.usertype == 'teacher') {
                  this._route.navigate(['/t_home/t_details']);
                }
              },
              err => {
                console.log(err);
                this.msg = err.error;
                // newTcrForm.resetForm();
              }
            );
        },
          err => {
            console.log(err);
            this.msg = err.error;
            newTcrForm.resetForm();
          }
        );
      console.log("called add");
    }
    else {
      console.log(this.teacher);
      this.teacher.email = this.user.email;
      this._auth.updateUser(this.user)
        .subscribe((data) => {
          this.user = JSON.parse(JSON.stringify(data));
          console.log(data);
          console.log(this.user);
          console.log(this.user["_id"]);
          this.teacher.user_id = this.user["_id"];
          console.log(data);
          //this.user = res;
          // this.user = { email: "", password: "", usertype: "admin" };
          // form.reset();
          // this._route.navigate(['/a_home/admins']);
          this.teacherService.updateTeacher(this.teacher)
            .subscribe(
              res => {
                console.log(res);
                alert("Teacher Details Updated");
                newTcrForm.resetForm();
                // this._route.navigate(['/a_home/admins']);
                if (this.usertype == 'admin') {
                  this._route.navigate(['/a_home/t_details']);
                }
                else if (this.usertype == 'teacher') {
                  this._route.navigate(['/t_home/t_details']);
                }
              },
              err => {
                console.log(err);
                this.msg = err.error;
                newTcrForm.resetForm();
              }
            );
        },
          err => {
            console.log(err);
            this.msg = err.error;
            newTcrForm.resetForm();
          }
        );
      console.log("called update");
    }
  }
}
