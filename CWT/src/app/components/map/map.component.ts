import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private router : Router, private app : AppComponent) {
      if(app.isTokenNull())
      {
        console.log("Token is null!{" + app.token + "}");
        router.navigate(['/']);
      }
   }

  ngOnInit(): void {
  }

}
