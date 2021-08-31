import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Loader } from "@googlemaps/js-api-loader"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor(private router : Router, private app : AppComponent) {
      /*if(app.isTokenNull()) --Uncomment this when done with Map Features.
      {
        console.log("Token is null!{" + app.token + "}");
        router.navigate(['/']);
      }
      else
      {*/
        this.addMapsScript();
      //}
   }

  ngOnInit(): void {
  }

  addMapsScript() {
    if (!document.querySelectorAll(`[src="${this.app.googleMapsUrl}"]`).length) { 
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: this.app.googleMapsUrl,
          onload: () => this.execute_Map()
        }));
    } else {
      this.execute_Map();
    }
  }
  execute_Map(): void {
    let map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: {lat: 41.7, lng: -73.7},
      zoom: 8
    });
    console.log(map.getDiv());
  }
}