import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { ContentComponent } from './content/content.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CourseQuizComponent } from './course-quiz/course-quiz.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    component: ToolbarComponent,
    children: [
      {
        path: '',
        component: ContentComponent,
      },
      {
        path: 'courses/:id',
        component: CourseComponent,
        children: [
          { path: '', component: CourseOverviewComponent },
          { path: 'quiz/:id', component: CourseQuizComponent },
        ],
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
