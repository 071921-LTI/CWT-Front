import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  displayFlag : boolean = false;

  constructor(private route: Router, private app : AppComponent) { 
    this.route.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd)
      {
        if(this.route.url.toString() != "/" && this.route.url.toString() != "/register")
        {
          this.RevealNav(true);
        }
        else
        {
          this.RevealNav(false);
        }
      }
    });
  }
  
  ngOnInit(): void {
  }

  LogOut(){
    console.log(this.route.url);
    if(this.route.url.toString() != "/" && this.route.url.toString() != "/register")
    {
      this.app.NullToken();
      alert("Logging out");
      this.route.navigate(['/']);
    }
    
  }

  RevealNav(x: boolean){
    this.displayFlag = x;
  }
}
