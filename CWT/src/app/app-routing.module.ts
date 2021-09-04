import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { MapComponent } from './components/map/map.component';
import { HistoryComponent } from './components/history/history.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminViewAllUsersComponent } from './components/admin-view-all-users/admin-view-all-users.component';
import { AdminDeleteUsersComponent } from './components/admin-delete-users/admin-delete-users.component';
import { AdminViewTripHistoryComponent } from './components/admin-view-trip-history/admin-view-trip-history.component';

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
  },
  {
    path: 'Admin',
    component: AdminComponent
  },
  {
    path: 'adminViewAll',
    component: AdminViewAllUsersComponent
  },
  {
    path: 'adminDelete',
    component: AdminDeleteUsersComponent
  },
  {
    path: 'adminViewAllTrips',
    component: AdminViewTripHistoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
