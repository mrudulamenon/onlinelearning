import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  // dropdownSettings={}; 
  dropdownSettings: IDropdownSettings={};

  title = "Class List";
  newclass = { classs:"", section:"", subjects:[] };
  classes = <any>[];  
  subobjarr = <any>[];
  edit_id = "";
  msg = "";
  MyValue = false;

constructor(private _auth: AuthService, private _route: Router) { }
public sections=["Lower Primary","Upper Primary", "Secondary","Higher Secondary"];
public subjects=[];

  ngOnInit(): void {
    this.getClasses();
    this.getSubjects();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true
    };
  }
  getSubjects(){
    return this._auth.getSubjects()
    .subscribe(
      res => {this.subobjarr = JSON.parse(JSON.stringify(res));
        // for(let i=0;i<this.subobjarr.length;i++){
        //   this.subjects=this.subobjarr["subject"];
        // }
       this.subjects= this.subobjarr.map(({subject})=>subject);
      console.log(this.subobjarr);
      console.log(this.subjects);
      this.dropdownList=this.subjects;
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
    console.log(this.selectedItems);    
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getClasses(){
    this._auth.getClasses()
    .subscribe(
      res => {this.classes = res},
      err => {
        console.log(err);
        this.msg = err.error;
      }
      // err => console.log(err)
    );  
  // .subscribe((data)=>{
  //   // this.classes = JSON.parse(JSON.stringify(data));
  // });
  }
  addClass() {
    // this.classs = { classs: "" };
    this.MyValue = true;
    this.edit_id ="";
    this.newclass = { classs:"", section:"", subjects:[] };
  }

  submitClass(classform: NgForm) {
    console.log(this.newclass);
    
    if (this.edit_id == "") {
      console.log(this.newclass);
      this._auth.addClass(this.newclass)
        .subscribe(
          res => {
            console.log(res);
            alert("New class Added");
            classform.resetForm();
            this.newclass = { classs:"", section:"", subjects:[] };
            this.getClasses();
            // this._route.navigate(['/a_home/admins']);
          },
          err => {
            console.log(err);
            this.msg = err.error;
            classform.resetForm();
          }
        );
    }
    else {
      this._auth.updateClass(this.newclass)
        .subscribe(
          res => {
            console.log(res);
            this.edit_id = "";
            alert("Class Updated");
            classform.resetForm();
            this.newclass = { classs:"", section:"", subjects:[] };
            this.getClasses();
          },
          err => {
            console.log(err);
            this.msg = err.error;
          })
    }
  }

  editClass(id) {
    this.MyValue = true;
    this.edit_id = id;
    this._auth.editClass(id)
      .subscribe((data) => {
        this.newclass = JSON.parse(JSON.stringify(data));
      },
        // res=> this.classs = res,
        err => {
          console.log(err);
          // this.msg = err.error;
        }
      )
  }

  deleteClass(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      this._auth.deleteClass(id)
        .subscribe(
          res => {
                this._auth.getClasses()
            .subscribe(     
              res=> this.classes = res,
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