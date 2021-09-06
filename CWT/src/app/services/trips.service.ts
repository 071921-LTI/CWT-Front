import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip'; 

let token = sessionStorage.getItem("token");

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': String(token),
  })
};
@Injectable({
  providedIn: 'root'
})
export class TripsService {
  
  private urlAllTrips = 'http://localhost:8080/trip/all';
  private urlOneTrip = 'http://localhost:8080/trip/';
  private urlddTrip = 'http://localhost:8080/trip';
  private urlUserTrips = 'http://localhost:8080/trip/user/';
  private dltUserTrip = 'http://localhost:8080/trip/dlt/';

  constructor(private http :HttpClient) { }

  getATrip(trip:number): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.urlOneTrip+trip,httpOptions);
  }

  getAllTrips(): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.urlAllTrips,httpOptions);
  }

  addTrip(trip:Trip):Observable<Trip>{
    return this.http.post<Trip>(this.urlddTrip,trip,httpOptions);
  }

  getTripsFromUser(user:number): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.urlUserTrips+user,httpOptions);
  }

  dltTrip(trip:Trip):Observable<string>{
    return this.http.delete<string>(this.dltUserTrip+trip.t_id,httpOptions);
  }

}
