import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _auth: AuthService,private router:Router) { }
  title: String = 'Online Learning';
  ngOnInit(): void {
  }
  loggedIn(){
    // return false;
    return this._auth.loggedIn();
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    this.router.navigate(['/']);
  }
}
