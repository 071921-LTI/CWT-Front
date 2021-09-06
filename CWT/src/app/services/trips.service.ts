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
  
  private urlAllTrips = 'http://ec2-3-139-58-167.us-east-2.compute.amazonaws.com:8081/trip/all';
  private urlOneTrip = 'http://ec2-3-139-58-167.us-east-2.compute.amazonaws.com:8081/trip/';
  private urlddTrip = 'http://ec2-3-139-58-167.us-east-2.compute.amazonaws.com:8081/trip';
  private urlUserTrips = 'http://ec2-3-139-58-167.us-east-2.compute.amazonaws.com:8081/trip/user/';

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
