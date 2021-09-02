import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Loader } from "@googlemaps/js-api-loader"

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey',
    'userid': '1'
  })
};
const locationButton = document.createElement("button");
import { Position } from '@angular/compiler';

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
  WayPointsMap : Map<number, String> = new Map<number, String>();
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

  ShowRoute() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(this.getMap());
    directionsRenderer.setPanel(document.getElementById("sidebar") as HTMLElement);
    if (this.x == null && this.mark == null) {
      this.x = this.SetPlace(this.starting_Street, this.starting_City, this.starting_State, this.starting_ZipCode);
      this.mark = this.SetPlace(this.end_Street, this.end_City, this.end_State, this.end_ZipCode);
    }
    this.Concatenate_WayPoints();
    let ways : google.maps.DirectionsWaypoint[] = [];
    if(this.WayPointsMap != null)
    {
      for(let i = 0; i < this.WayPointsMap.size; i++)
      {
        ways.push( {
          location: this.WayPointsMap.get(i) as string,
          stopover: false
        });
      }
    }
    directionsService
      .route({
        origin: this.x,
        destination: this.mark,
        waypoints: ways,
        travelMode: google.maps.TravelMode.DRIVING,
      }).then((response) => {
        directionsRenderer.setDirections(response);
        console.log(response);
      }).catch((e) => window.alert("Directions request failed due to " + status));
  }

  Add_Additional_Waypoint(){
    let table = document.getElementById('repeating_WayPoints');
    let cell = document.createElement('div');
    let numID = 0;
    if(table?.hasChildNodes)
    {
      numID = table.children.length;
    }
    cell.id = "WayPoint{" + numID + "}";
    let street = document.createElement('input');
    let city = document.createElement('input');
    let state = document.createElement('input');
    let zip = document.createElement('input');
    street.innerHTML = `<input type="text" name="way_Street" id ="street${numID}">`
    city.innerHTML = `<input type="text" name="way_City" id ="city${numID}">`
    state.innerHTML = `<input type="text" name="way_State" id ="state${numID}">`
    zip.innerHTML = `<input type="number" name="way_Zip" id ="zip${numID}">`
    zip.type = "number";
    zip.pattern = "[0-9]{5}";
    zip.placeholder = "Zip Code";
    cell.appendChild(street);
    cell.appendChild(city);
    cell.appendChild(state);
    cell.appendChild(zip);
    table?.appendChild(cell);
  }

  //Helper Functions

  //Returns a singleton map
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

  //Formats the user input into something usable.
  SetPlace(Street: string, City: string, State: string, ZipCode: string): any { 
    return Street + "," + City + "," + State + "," + ZipCode;
  }

  Concatenate_WayPoints()
  {
    let values :[any] = [""];
    let table = document.getElementById('repeating_WayPoints') as HTMLDivElement;

    table.childNodes.forEach(function (item) {
        let ID = item as HTMLDivElement;
        item.childNodes.forEach(function (cell) {
          let input = cell as HTMLInputElement;
          if(input.value != null || input.value != "")
          {
            values.push(ID.id + "-" + input.value);
          }
        })  
    });
    for(let i = 1; i < values.length; i++)
    {
      console.log(values[i]);
      let waypoint = values[i] as string;
      let spl = waypoint.split('-');
      spl[0] = spl[0].slice(spl[0].indexOf('{')+1,spl[0].indexOf('}'));
      console.log(spl[0]);
      let WayPointNumber = parseInt(spl[0]); 
      if(this.WayPointsMap.has(WayPointNumber))
      {
        let NewVal = this.WayPointsMap.get(WayPointNumber) + "," + spl[1];
        console.log("NewVal = " + NewVal);
        this.WayPointsMap.set(WayPointNumber, NewVal);
      }
      else
      {
        this.WayPointsMap.set(WayPointNumber, spl[1]);
      }
    }    
  }
}