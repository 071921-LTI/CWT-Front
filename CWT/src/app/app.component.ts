import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CWT';
  token : string | null = "";
  googleMapsUrl : string = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA2nbNo7DN2i3zGRwFxuDnIERE3Tmjivv0";
  isTokenNull() {
    if(this.token == null || this.token == "")
      return true;
    return false;
  }

  NullToken() {
    this.token = null;
  }
}
