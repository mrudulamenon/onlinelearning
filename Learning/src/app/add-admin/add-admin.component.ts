import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  title = "AdminUsers";
  user = { email: "", password: "", usertype: "admin" };
  users = <any>[];
  edit_id = "";
  msg = "";
  MyValue = false;

  constructor(private _auth: AuthService, private _route: Router) { }
  ngOnInit(): void {
    this._auth.getAdminUsers()
      .subscribe(
        res => this.users = res,
        // err => console.log(err)
      )
    err => {
      console.log(err);
      this.msg = err.error;
    }
    // .subscribe((data)=>{
    //   // this.users = JSON.parse(JSON.stringify(data));
    // });
  }
  addUser() {
    this.user = { email: "", password: "", usertype: "admin" };
    this.MyValue = true;
    this.edit_id="";
  }

  submitUser(userform: NgForm) {
    if (this.edit_id == "") {
      this._auth.registerUser(this.user)
        .subscribe(
          res => {
            console.log(res);
            alert("New user Added");
            userform.resetForm();
            this._auth.getAdminUsers()
            .subscribe(     
              res=> this.users = res,
              err=> console.log(err)
              )
            // this.user = { email: "", password: "", usertype: "admin" };
            // form.reset();
            // this._route.navigate(['/a_home/admins']);
          },
          err => {
            console.log(err);
            this.msg = err.error;
            userform.resetForm();
          }
        );
    }
    else {
      console.log("else");
      
      this._auth.updateUser(this.user)
        .subscribe(
          res => {
            console.log(res);
            this.edit_id = "";
            alert("Profile Updated");
            userform.resetForm();
            this._auth.getAdminUsers()
            .subscribe(     
              res=> this.users = res,
              err=> console.log(err)
              )
          },
          err => {
            console.log(err);
            this.msg = err.error;
          })
    }
  }

  editUser() {
    let id = localStorage.getItem("user_id");
    this.edit_id=id;
    this.MyValue = true;    
    this._auth.editUser(id)
      .subscribe((data) => {
        this.user = JSON.parse(JSON.stringify(data));
        console.log(this.user["_id"]);
        
        this.edit_id = this.user["_id"];
      },
        // res=> this.user = res,
        err => {
          console.log(err);
          // this.msg = err.error;
        }
      )
  }

  deleteUser(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      this._auth.deleteUser(id)
        .subscribe(
          res => {
                this._auth.getAdminUsers()
            .subscribe(     
              res=> this.users = res,
              err=> console.log(err)
              )
            this._route.navigate(['/a_home/admins']);
          },
          err => {
            console.log(err);
            this.msg = err.error;
          })
    }
  }
}
