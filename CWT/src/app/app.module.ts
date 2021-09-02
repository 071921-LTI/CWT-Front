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
