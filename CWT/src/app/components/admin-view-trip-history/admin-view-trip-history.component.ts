import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripsService } from 'src/app/services/trips.service';


@Component({
  selector: 'app-admin-view-trip-history',
  templateUrl: './admin-view-trip-history.component.html',
  styleUrls: ['./admin-view-trip-history.component.css']
})
export class AdminViewTripHistoryComponent implements OnInit {
  trips:Trip[]=[]

  
  constructor(private trip:TripsService) { }

  ngOnInit(): void {
    this.getAllTrips();
  }

  getAllTrips(){
    this.trip.getAllTrips().subscribe((rtrnTrips)=>(this.trips = rtrnTrips))
  }


  filterByUser(){
    let id = +(<HTMLInputElement>document.getElementById("id")).value;
    this.trip.getTripsFromUser(id).subscribe((response)=>(this.trips = response))
  }
  deleteTrip(tripDlt:Trip){
    this.trip.dltTrip(tripDlt).subscribe();
  }

}
