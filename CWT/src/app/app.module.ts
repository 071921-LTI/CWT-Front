import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms"; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BannerComponent } from './components/banner/banner.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { MapComponent } from './components/map/map.component';
import { HistoryComponent } from './components/history/history.component';
import { WeatherComponent } from './components/weather/weather.component';
import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component';
import { AdminViewAllUsersComponent } from './components/admin-view-all-users/admin-view-all-users.component';
import { AdminDeleteUsersComponent } from './components/admin-delete-users/admin-delete-users.component';
import { AdminViewTripHistoryComponent } from './components/admin-view-trip-history/admin-view-trip-history.component';
import { ButtonComponent } from './components/button/button.component';
import { AddTripButtonComponent } from './components/add-trip-button/add-trip-button.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LogInComponent,
    BannerComponent,
    NavComponent,
    FooterComponent,
    MyComponentComponent,
    MapComponent,
    HistoryComponent,
    WeatherComponent,
    AdminComponent,
    AdminNavBarComponent,
    AdminViewAllUsersComponent,
    AdminDeleteUsersComponent,
    AdminViewTripHistoryComponent,
    ButtonComponent,
    AddTripButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
