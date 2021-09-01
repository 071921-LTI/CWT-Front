import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Loader } from "@googlemaps/js-api-loader"
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Xliff } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey',
    'userid': '1'
  })
};
const locationButton = document.createElement("button");

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  starting_Street: string = "";
  starting_City: string = "";
  starting_State: string = "";
  starting_ZipCode: string = "";
  end_Street: string = "";
  end_City: string = "";
  end_State: string = "";
  end_ZipCode: string = "";
  x: any;
  mark: any;
  single_Map: any;

  constructor(private router: Router, private app: AppComponent) {
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
      document.body.appendChild
        (
          Object.assign
            (
              document.createElement('script'),
              {
                type: 'text/javascript',
                src: this.app.googleMapsUrl,
                onload: () => this.execute_Map()
              }
            )
        );
    }
    else {
      this.execute_Map();
    }
  }

  execute_Map(): void {
    //Marker Listener
    this.getMap().addListener
      (
        "click", (mapsMouseEvent: any) => {
          let map = this.getMap();
          const marker = new google.maps.Marker
            (
              {
                position: mapsMouseEvent.latLng,
                map
              }
            );
          this.mark = mapsMouseEvent.latLng;
        }
      );

    locationButton.textContent = "Pin to Current Location";
    locationButton.classList.add("custom-map-control-button");
    this.addLocationEvent()
    this.getMap().controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  }

  addLocationEvent() {
    // Current Location Function
    let infoWindow = new google.maps.InfoWindow();
    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          let map = this.getMap();
          const pos =
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          map.setCenter(pos);
          const marker = new google.maps.Marker
            (
              {
                position: pos,
                map,
              }
            );
          this.x = pos;
        });
      }
    }
    );
    //Marker Function
    this.getMap().addListener("click", (mapsMouseEvent: any) => {
      let map = this.getMap();
      const marker = new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map,
      });
      this.mark = mapsMouseEvent.latLng;
    });
  }


  ShowRoute() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(this.getMap());
    directionsRenderer.setPanel(document.getElementById("sidebar") as HTMLElement);
    if (this.x == null && this.mark == null) {
      this.x = this.SetPlace(this.starting_Street, this.starting_City, this.starting_State, this.starting_ZipCode);
      this.mark = this.SetPlace(this.end_Street, this.end_City, this.end_State, this.end_ZipCode);
    }
    directionsService
      .route({
        origin: this.x,
        destination: this.mark,
        travelMode: google.maps.TravelMode.DRIVING,
      }).then((response) => {
        directionsRenderer.setDirections(response);
        console.log(response);
      }).catch((e) => window.alert("Directions request failed due to " + status));
  }

  getMap(newInstance?: boolean) {
    if (newInstance) {
      return new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 41.7, lng: -73.7 },
        zoom: 8
      });
    }
    else {
      if (this.single_Map == null) {
        this.single_Map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: 41.7, lng: -73.7 },
          zoom: 8
        });
      }
      return this.single_Map;
    }

  }

  SetPlace(Street: string, City: string, State: string, ZipCode: string): any {
    return Street + "," + City + "," + State + "," + ZipCode;
  }

}

