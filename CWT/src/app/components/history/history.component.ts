import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';
import { Trip } from 'src/app/trip';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  trips: Trip[] =[];

  constructor(private trip: TripsService) {
  }

  ngOnInit(): void {
    this.userTrips(1)
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
