import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BannerComponent } from './components/banner/banner.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyComponentComponent } from './components/my-component/my-component.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LogInComponent,
    BannerComponent,
    NavComponent,
    FooterComponent,
    MyComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
