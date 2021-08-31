import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Loader } from "@googlemaps/js-api-loader"
import { Position } from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  x:any;
  mark:any;
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
    
    // Current Location Function
    let infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");
    locationButton.textContent = "Pin to Current Location";
    locationButton.classList.add("custom-map-control-button");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
              const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            map.setCenter(pos);
            const marker = new google.maps.Marker({
              position: pos,
              map,
            });
            this.x = pos;
          }
        );
      } 
    });
    //Marker Function

    map.addListener("click", (mapsMouseEvent:any) => {
      const marker = new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map,
      });
      this.mark = mapsMouseEvent.latLng;
    });


    // Direction Function
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("sidebar") as HTMLElement);
    const control = document.getElementById("floating-panel") as HTMLElement;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    const onChangeHandler =  () => {
      // const start = (document.getElementById("start") as HTMLInputElement).value;
      // let start:any = "21 Elton Court,Uncasville,CT";
      // let end:any = "30 norwitch road,CT";
      // const end = (document.getElementById("end") as HTMLInputElement).value;

      directionsService
      .route({
        origin: this.x,
        destination: this.mark,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        console.log(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));

    };

    (document.getElementById("GO") as HTMLElement).addEventListener(
      "click",
      onChangeHandler
    );


  }
}