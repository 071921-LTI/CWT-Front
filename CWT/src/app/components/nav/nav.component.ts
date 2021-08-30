import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  displayFlag : boolean = true;

  constructor(private route: Router, private app : AppComponent) { 
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

  /*RevealNav(){
    this.displayFlag = true;
  }*/
}
