import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TeacherhomeComponent } from './teacherhome/teacherhome.component';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { TeacherdetailsComponent } from './teacherdetails/teacherdetails.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { AddteacherComponent } from './addteacher/addteacher.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { TeacheruploadComponent } from './teacherupload/teacherupload.component';
import { StudentuploadComponent } from './studentupload/studentupload.component';
import { AddTUploadComponent } from './add-t-upload/add-t-upload.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';
import { LoginComponent } from './login/login.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddSUploadComponent } from './add-s-upload/add-s-upload.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login/:type',
        component: LoginComponent
      }
    ]
  },
  // {
  //   path:'login',
  //   component:LoginComponent
  // },
  // {
  //   path:'register',
  //   component:AddteacherComponent
  // },
  {
    path: 'a_home',
    component: AdminhomeComponent,
    children: [
      {
        path: 'admins',
        component: AddAdminComponent
      },
      {
        path: 'subjects',
        component: SubjectsComponent
      },
      {
        path: 'class',
        component: ClassesComponent
      },
      {
        path: 't_details',
        component: TeacherdetailsComponent,
        children: [
          {
            path: 'edit_teacher/:_id',
            component: AddteacherComponent
          }
        ]
      },
      {
        path: 'add_teacher',
        component: AddteacherComponent
      },
      {
        path: 's_details',
        component: StudentdetailsComponent,
        children: [
          {
            path: 'edit_student/:_id',
            component: AddstudentComponent
          }
        ]
      },
      {
        path: 'add_student',
        component: AddstudentComponent
      },
      {
        path: 'add_t_upload',
        component: AddTUploadComponent
      },
      {
        path: 't_upload',
        component: TeacheruploadComponent,
        children: [
          {
            path: 'edit_t_upload/:_id',
            component: AddTUploadComponent
          },
          // {
          //   path: 'add_s_upload/:t_u_id',
          //   component: AddSUploadComponent
          // }
        ]
      },
      {
        path: 'add_s_upload/:t_u_id',
        component: AddSUploadComponent
      },
      {
        path: 's_upload',
        component: StudentuploadComponent,
        children: [
          {
            path: 'edit_s_upload/:_id',
            component: AddSUploadComponent
          }
        ]
      }
    ]
  },
  {
    path: 't_home',
    component: TeacherhomeComponent,
    children: [
      {
        path: 't_details',
        component: TeacherdetailsComponent
      },
      // {
      //   path:'add_teacher/:t_id',
      //   component:AddteacherComponent
      // },
      {
        path: 's_details',
        component: StudentdetailsComponent,
        children: [
          {
            path: 'edit_student/:_id',
            component: AddstudentComponent
          }
        ]
      },
      {
        path: 'add_student',
        component: AddstudentComponent
      },
      // {
      //   path:'add_student/:s_id',
      //   component:AddstudentComponent
      // },
      {
        path: 'add_t_upload',
        component: AddTUploadComponent
      },
      {
        path: 't_upload',
        component: TeacheruploadComponent,
        children: [
          {
            path: 'edit_t_upload/:_id',
            component: AddTUploadComponent
          },
          {
            path: 'add_s_upload/:t_u_id',
            component: AddSUploadComponent
          }
        ]
      },
      // {
      //   path: 'add_t_upload/:email',
      //   component: AddTUploadComponent
      // },
      {
        path: 's_upload',
        component: StudentuploadComponent,
        children: [
          {
            path: 'edit_s_upload/:_id',
            component: AddSUploadComponent
          }
        ]
      }
    ]
  },
  {
    path: 's_home',
    component: StudenthomeComponent,
    children: [
      {
        path: 't_upload',
        component: TeacheruploadComponent,
        children: [
          {
            path: 'add_s_upload/:t_u_id',
            component: AddSUploadComponent
          }
        ]
      },
      
      {
        path: 'add_s_upload/:t_u_id',
        component: AddSUploadComponent
      },
      {
        path: 's_upload',
        component: StudentuploadComponent,
        children: [
          {
            path: 'edit_s_upload/:_id',
            component: AddSUploadComponent
          }
        ]
      }
      // {
      //   path: 'edit_s_upload/:s_u_id',
      //   component: AddSUploadComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
