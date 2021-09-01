import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CallWeatherService {

  constructor(private http:HttpClient) { }
  private key:string = 'AYF394JUTUBY8MUDMHNYPCEY5';
  
  callBasicWeather(address:any){
    return this.http.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+
    address+'?unitGroup=us&key='
    +this.key);
  }

  //Dates should be in the format yyyy-MM-dd
  //the address, partial address or latitude,longitude location for which to retrieve weather data. You can also use US ZIP Codes.
  getWeatherBetweenTwoDays(address:any,day1:any,day2:any){
    // return this.http.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[${address}]/[${day1}]/[${day2}]?key=${key}');
  }


}
