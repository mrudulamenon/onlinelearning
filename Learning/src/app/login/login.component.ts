import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUserDetails = { email: "", password: "" , usertype:""};
  error="";
  constructor(private a_route:ActivatedRoute,private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.a_route.params.subscribe(params =>{
      this.loginUserDetails.usertype = params['type'];
    });    
  }

  loginUser() {
    //console.log(this.loginUserDetails);
    this._auth.loginUser(this.loginUserDetails)
      .subscribe(
        res => {
          console.log(res);
          console.log(res["token"]);
          console.log(res["payload"]);
          const payload = res["payload"];
          localStorage.setItem('token', res["token"]);
          localStorage.setItem('type', payload.type);
          localStorage.setItem('user_id',payload.subject);
          localStorage.setItem('email',payload.email);
          if(payload.type=="admin"){
            this.router.navigate(['/a_home']);
          }
          else if(payload.type=="teacher"){
            this.router.navigate(['/t_home']);
          }
          else if(payload.type=="student"){
            this.router.navigate(['/s_home']);
          }
        },
        err => {console.log(err);
        
        }
        // res=>{
        //     alert("Success");
        //     this.router.navigate(['/']);
        //     },
        // err=>{alert("Login Failed");
        //     this.router.navigate(['/login']);
        //   }      
      );
    // alert("Success");
  }

  
}
