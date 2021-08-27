import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  displayFlag : boolean = false;

  constructor(private router: Router) { 
    if(this.router.url !== "/")
    {
      if(this.router.url !== "/register")
      {
          
      }
    }
  }

  ngOnInit(): void {
  }

}
