import { Component, OnInit } from '@angular/core';
import { TeacherModel } from '../addteacher/addteacher.model';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-teacherdetails',
  templateUrl: './teacherdetails.component.html',
  styleUrls: ['./teacherdetails.component.css']
})
export class TeacherdetailsComponent implements OnInit {

  title: String = "Teacher List";
  //Teacher is the model for a teacher item
  teachers: TeacherModel[];
  //creating service object for calling getTeachers()
  constructor(private _auth: AuthService, private teacherService: TeacherService, private _route: Router) { }
  
  loggedIn(){
    return this._auth.loggedIn();
  }
 
  ngOnInit(): void {
    //calling getTeachers() and loading the teachers to teachers array
    this.teacherService.getTeachers()
      .subscribe((data) => {
        this.teachers = JSON.parse(JSON.stringify(data));
        //console.log("Pro"+this.teachers[0]._id);
        //console.log("data"+data[0]._id);      
      })
  }
  getuserhome(){
    let type= localStorage.getItem('type');
    if(type=='admin'){return 'a_home';}
    else if(type=='teacher'){return 't_home';}
  }
  deleteTeacher(id): void {
    if (window.confirm("Are you sure you want to delete?")){
      this.teacherService.deleteTeacher(id)
        .subscribe((data) => {
          this.teachers = JSON.parse(JSON.stringify(data));
          // console.log("deleted" + data);
          // this.router.navigate(['/']);
        });
    }
  }
}
