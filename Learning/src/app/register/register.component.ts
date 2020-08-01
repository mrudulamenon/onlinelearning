import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = "AdminUsers";
  user = { email: "", password: "", usertype: "admin" };
  users = <any>[];

  constructor(private _auth: AuthService, private _route: Router) { }
  ngOnInit(): void {
  }
  
  submitUser(userform: NgForm) {
      this._auth.registerUser(this.user)
        .subscribe(
          res => {
            console.log(res);
            alert("New user Added. Please Login as Admin to Continue");
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
            userform.resetForm();
          }
        );
  }
}
