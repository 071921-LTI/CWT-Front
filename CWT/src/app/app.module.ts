import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponentComponent } from './log-in-component/log-in-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponentComponent,
    RegisterComponentComponent,
    RegisterUserComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
