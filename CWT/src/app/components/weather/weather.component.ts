import { Component, OnInit,Input,Output } from '@angular/core';
import { CallWeatherService } from 'src/app/services/call-weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
@Input() day1:string = '';
@Input() day2:string = '';
currLocWeather: any = {}
@Input() location:string = '';
@Output() todaysWeather:any ='';
@Output() nextDayWeather:string = '';

  constructor(private api:CallWeatherService) { }
 
  ngOnInit(): void {
    // this.api.callBasicWeather(77484).subscribe((weather)=>
    // {console.log(weather);
    //  this.currLocWeather = weather});
     
    // console.log(this.currLocWeather)
  }


    // this.api.callBasicWeather().subscribe((data)=>{
    //   console.log(data)
    //   // this.forecast = data['description'];
    //   this.forecast = ''
    //   // data['resolvedAddress'];
    // })



    // this.api.getWeatherBetweenTwoDays().subscribe((data1)=>{})

    // this.api.getWeatherBetweenTwoDays().subscribe((data2)=>{})


}
