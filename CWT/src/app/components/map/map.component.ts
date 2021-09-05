import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Loader } from "@googlemaps/js-api-loader"
import { HttpHeaders } from '@angular/common/http';
import { Trip } from 'src/app/models/trip';
import { TripsService } from 'src/app/services/trips.service';

let token:String| null = sessionStorage.getItem("token");

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
  currentLocation:string = '';
  DestinationMark:string = '';
  timeElapsed:any;
  @Output() out:EventEmitter<any> = new EventEmitter();
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
  WayPointsMap: Map<number, String> = new Map<number, String>();
  
  tripToAdd:Trip[]=[];

  constructor(private router: Router, private app: AppComponent, private tripSvc:TripsService) {}

  ngOnInit(): void {
    this.addMapsScript();
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
          this.currentLocation = String(this.x['lat'])+ ','+ String(this.x['lng']);
          this.out.emit();
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
      this.DestinationMark = String(this.mark.toJSON()['lat'])+ ','+ String(this.mark.toJSON()['lng']);
    
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
      this.currentLocation = this.x;
      this.DestinationMark = this.mark;
    }
    else{
      let input1 = this.SetPlace(this.starting_Street, this.starting_City, this.starting_State, this.starting_ZipCode);
      let input2 = this.SetPlace(this.end_Street, this.end_City, this.end_State, this.end_ZipCode);
      if(input1.length >3 && input2.length >3){
        this.x = input1;
        this.mark = input2;
        this.currentLocation = this.x;
        this.DestinationMark = this.mark;
      }
    }


    this.Concatenate_WayPoints();
    let ways: google.maps.DirectionsWaypoint[] = [];
    if (this.WayPointsMap != null) {
      for (let i = 0; i < this.WayPointsMap.size; i++) {
        ways.push({
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
        this.timeElapsed =response['routes'][0].legs[0].duration?.value;
      }).catch((e) => window.alert("Directions request failed due to " + status));
  }

  Add_Additional_Waypoint() {
    let table = document.getElementById('repeating_WayPoints');
    let cell = document.createElement('div');
    let numID = 0;
    if (table?.hasChildNodes) {
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

  Concatenate_WayPoints() {
    let values: [any] = [""];
    let table = document.getElementById('repeating_WayPoints') as HTMLDivElement;

    table.childNodes.forEach(function (item) {
      let ID = item as HTMLDivElement;
      item.childNodes.forEach(function (cell) {
        let input = cell as HTMLInputElement;
        if (input.value != null || input.value != "") {
          values.push(ID.id + "-" + input.value);
        }
      })
    });
    for (let i = 1; i < values.length; i++) {
      console.log(values[i]);
      let waypoint = values[i] as string;
      let spl = waypoint.split('-');
      spl[0] = spl[0].slice(spl[0].indexOf('{') + 1, spl[0].indexOf('}'));
      console.log(spl[0]);
      let WayPointNumber = parseInt(spl[0]);
      if (this.WayPointsMap.has(WayPointNumber)) {
        let NewVal = this.WayPointsMap.get(WayPointNumber) + "," + spl[1];
        console.log("NewVal = " + NewVal);
        this.WayPointsMap.set(WayPointNumber, NewVal);
      }
      else {
        this.WayPointsMap.set(WayPointNumber, spl[1]);
      }
    }
  }

  addTriptoDB(){
    this.tripToAdd.push({curr_location:this.currentLocation,
                        destination:this.DestinationMark,time_elapsed:this.timeElapsed/60,
                        user_id:Number(String(token).split(':',2)[0])})
    console.log(this.currentLocation)
    console.log(this.DestinationMark)
    console.log("Hours"+Number(this.timeElapsed))
    console.log(Number(String(token).split(':',2)[0]))
    console.log("add trip")
    console.log(this.tripToAdd[0])
    this.tripSvc.addTrip(this.tripToAdd[0]).subscribe()
  }

}