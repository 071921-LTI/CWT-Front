import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(private route: Router, private app: AppComponent) { }

  ngOnInit(): void {
  }

  LogOut() {
    if (this.route.url.toString() != "/" && this.route.url.toString() != "/register") {
      this.app.NullToken();
      alert("Logging out");
      this.route.navigate(['/']);
    }

  }

  users() {
    this.route.navigate(['/', "adminViewAll"])
  }
  mngUsers() {
    this.route.navigate(['/', "adminDelete"])
  }
  mngTrips() {
    this.route.navigate(['/', "adminViewAllTrips"])
  }

}
