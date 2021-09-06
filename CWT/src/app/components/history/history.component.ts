import { Component, OnInit ,Input} from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';
import { Trip } from 'src/app/models/trip';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    trips: Trip[] =[];
    @Input() currentLocation:any;
    @Input() DestinationMark:any;
    @Input() timeElapsed:any;
    token:String| null = sessionStorage.getItem("token");
    userId = String(this.token).split(':',2)[0];
  constructor(private trip: TripsService) {
  }

  ngOnInit(): void {
    this.trip.getTripsFromUser(Number(this.userId)).subscribe((rtnTrp)=>(this.trips = rtnTrp));
  }

  getAllTrips(){
    this.trip.getAllTrips().subscribe((rtrnTrips)=>(this.trips = rtrnTrips))
  }

  userTrips(user: number) {
    this.trip.getTripsFromUser(user).subscribe(
      (tripsReturned) => (this.trips = tripsReturned)
    )
  }

  oneTrip(tripId: number) {
    this.trip.getATrip(tripId).subscribe(
      (retuned) => (this.trips = retuned)
    );
  }

  allTrips() {
    this.trip.getAllTrips().subscribe(
      (allreturned) => (this.trips = allreturned)
    )
  }

  addATrip(addTrip: Trip) {
    this.trip.addTrip(addTrip).subscribe(
      (added) => this.trips
    )
  }

  deleteTrip(tripId: number) {

  }
}
