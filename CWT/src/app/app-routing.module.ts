import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { MapComponent } from './components/map/map.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'Main',
    component: MapComponent
  },
  {
    path: 'History',
    component: HistoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
