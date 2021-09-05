import { Component, OnInit,Input } from '@angular/core';
import { CallWeatherService } from 'src/app/services/call-weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

@Input() currentLocation:any;
@Input() DestinationMark:any;
@Input() timeElapsed:any;
curTemp:any;
curWeather:any;
curHumidity:any;
curTime:any;
txt:string= '';
Destday:number = 0;
DestTemp:any;
DestWeather:any;
DestHumidity:any;
DestTime:any;
public currWeather:any=[];
public destWeather:any=[];
  constructor(private api:CallWeatherService) { }
 
  ngOnInit(): void {
    
  }

  callCurrWeather():void{
    this.api.callBasicWeather(this.currentLocation).subscribe((response)=>
    {this.currWeather = response
    this.curTemp = this.currWeather['currentConditions'].temp;
    this.curWeather = this.currWeather['currentConditions'].conditions;
    this.curHumidity = this.currWeather['currentConditions'].humidity;
    this.curTime = this.currWeather['currentConditions'].datetime;});
    this.txt= '';
    this.txt += "<td>" + this.currentLocation + "</td>";
    this.txt += "<td>" + this.curTemp +"°F" + "</td>";
    this.txt += "<td>" + this.curWeather + "</td>";
    this.txt += "<td>" + this.curHumidity + "</td>";
    this.txt += "<td>" + this.curTime + "</td>";
    this.txt += "</tr>"; 
            
    const myElement = document.getElementById('table1')!;
    myElement.innerHTML = this.txt;
  }
  

  callDestWeather():void{
    if (this.timeElapsed>=86400){
      this.Destday = Math.round(this.timeElapsed /86400);
    }

    this.api.callBasicWeather(this.DestinationMark).subscribe((response)=>
    {this.destWeather = response
    this.DestTemp = this.destWeather['days'][this.Destday].temp;
    this.DestWeather = this.destWeather['days'][this.Destday].conditions;
    this.DestHumidity = this.destWeather['days'][this.Destday].humidity;
    this.DestTime = this.destWeather['days'][this.Destday].datetime;
    this.txt += "<td>" + this.DestinationMark + "</td>";
    this.txt += "<td>" + this.DestTemp +"°F" + "</td>";
    this.txt += "<td>" + this.DestWeather + "</td>";
    this.txt += "<td>" + this.DestHumidity + "</td>";
    this.txt += "<td>" + this.DestTime + "</td>";
    this.txt += "</tr>"; 
            
    const myElement = document.getElementById('table1')!;
    myElement.innerHTML = this.txt;
  });
  }



}