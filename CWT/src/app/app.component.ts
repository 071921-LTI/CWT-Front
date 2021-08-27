import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CWT';
  token : string | null = "";

  isTokenNull() {
    if(this.token == null || this.token == "")
      return true;
    return false;
  }

  NullToken() {
    this.token = null;
  }
}
