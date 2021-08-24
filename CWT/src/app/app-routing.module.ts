import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
