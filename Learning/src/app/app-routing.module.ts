import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

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
import { RegisterComponent } from './register/register.component';
import { ViewUserComponent } from './view-user/view-user.component';
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
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path: 'a_home',
    component: AdminhomeComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'admins',
        component: AddAdminComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'class',
        component: ClassesComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 't_details',
        component: TeacherdetailsComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_teacher/:_id',
            component: AddteacherComponent,
            canActivate:[AuthGuard]
          }
        ]
      },
      {
        path: 'add_teacher',
        component: AddteacherComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 's_details',
        component: StudentdetailsComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_student/:_id',
            component: AddstudentComponent,
            canActivate:[AuthGuard]
          }
        ]
      },
      {
        path: 'add_student',
        component: AddstudentComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'add_t_upload',
        component: AddTUploadComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 't_upload',
        component: TeacheruploadComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_t_upload/:_id',
            component: AddTUploadComponent,
            canActivate:[AuthGuard]
          }
          // {
          //   path: 'add_s_upload/:t_u_id',
          //   component: AddSUploadComponent
          // }
        ]
      },
      {
        path: 'add_s_upload/:t_u_id',
        component: AddSUploadComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'view_s_upload/:t_u_id',
        component: StudentuploadComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_s_upload/:_id',
            component: AddSUploadComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'view_user/:user_id',
            component: ViewUserComponent,
            canActivate:[AuthGuard]
          }
        ]
      },      
      
      {
        path: 's_upload',
        component: StudentuploadComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_s_upload/:_id',
            component: AddSUploadComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'view_user/:user_id',
            component: ViewUserComponent,
            canActivate:[AuthGuard]
          }
        ]
      }
    ]
  },
  {
    path: 't_home',
    component: TeacherhomeComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 't_details',
        component: TeacherdetailsComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_teacher/:_id',
            component: AddteacherComponent,
            canActivate:[AuthGuard]
          }
        ]
      },
      // {
      //   path:'add_teacher/:t_id',
      //   component:AddteacherComponent
      // },
      {
        path: 's_details',
        component: StudentdetailsComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_student/:_id',
            component: AddstudentComponent,
            canActivate:[AuthGuard]
          }
        ]
      },
      {
        path: 'add_student',
        component: AddstudentComponent,
        canActivate:[AuthGuard]
      },
      // {
      //   path:'add_student/:s_id',
      //   component:AddstudentComponent
      // },
      {
        path: 'add_t_upload',
        component: AddTUploadComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 't_upload',
        component: TeacheruploadComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_t_upload/:_id',
            component: AddTUploadComponent,
            canActivate:[AuthGuard]
          }
          // {
          //   path: 'add_s_upload/:t_u_id',
          //   component: AddSUploadComponent,
          //   canActivate:[AuthGuard]
          // }
        ]
      },
      {
        path: 'add_s_upload/:t_u_id',
        component: AddSUploadComponent,
        canActivate:[AuthGuard]
      },
      // {
      //   path: 'add_t_upload/:email',
      //   component: AddTUploadComponent
      // },
      {
        path: 'view_s_upload/:t_u_id',
        component: StudentuploadComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_s_upload/:_id',
            component: AddSUploadComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'view_user/:user_id',
            component: ViewUserComponent,
            canActivate:[AuthGuard]
          }
        ]
      },      
      
      {
        path: 's_upload',
        component: StudentuploadComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_s_upload/:_id',
            component: AddSUploadComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'view_user/:user_id',
            component: ViewUserComponent,
            canActivate:[AuthGuard]
          }
        ]
      }
    ]
  },
  {
    path: 's_home',
    component: StudenthomeComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 't_upload',
        component: TeacheruploadComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'add_s_upload/:t_u_id',
            component: AddSUploadComponent,
            canActivate:[AuthGuard]
          }
        ]
      },
      
      {
        path: 'add_s_upload/:t_u_id',
        component: AddSUploadComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 's_upload',
        component: StudentuploadComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'edit_s_upload/:_id',
            component: AddSUploadComponent,
            canActivate:[AuthGuard]
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
