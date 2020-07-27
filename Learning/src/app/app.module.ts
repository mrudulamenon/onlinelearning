import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TeacherdetailsComponent } from './teacherdetails/teacherdetails.component';
import { AddteacherComponent } from './addteacher/addteacher.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { TeacheruploadComponent } from './teacherupload/teacherupload.component';
import { StudentuploadComponent } from './studentupload/studentupload.component';
import { TeacherhomeComponent } from './teacherhome/teacherhome.component';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { HomeComponent } from './home/home.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AddTUploadComponent } from './add-t-upload/add-t-upload.component';
import { AddSUploadComponent } from './add-s-upload/add-s-upload.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AddAdminComponent } from './add-admin/add-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    TeacherdetailsComponent,
    AddteacherComponent,
    StudentdetailsComponent,
    AddstudentComponent,
    TeacheruploadComponent,
    StudentuploadComponent,
    TeacherhomeComponent,
    StudenthomeComponent,
    HomeComponent,
    AdminhomeComponent,
    AddTUploadComponent,
    AddSUploadComponent,
    SubjectsComponent,
    ClassesComponent,
    LoginComponent,
    AddAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [AuthService,AuthGuard,
  {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
