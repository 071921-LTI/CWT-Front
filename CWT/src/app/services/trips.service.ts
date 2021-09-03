import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../trip'; 

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private urlAllTrips = 'http://localhost:8080/trip/all';
  private urlOneTrip = 'http://localhost:8080/trip/';//need to add value at the end with what trip needs to be requested
  private urlddTrip = 'http://localhost:8080/trip';

  constructor(private http :HttpClient) { }


  getATrip(trip:number): Observable<Trip>{
    return this.http.get<Trip>(this.urlOneTrip+trip)
  }

  getAllTrips(): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.urlAllTrips)
  }

  addTrip(trip:Trip):Observable<Trip>{
    return this.http.post<Trip>(this.urlddTrip,trip);
  }
}
