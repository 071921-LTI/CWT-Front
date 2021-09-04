import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-view-all-users',
  templateUrl: './admin-view-all-users.component.html',
  styleUrls: ['./admin-view-all-users.component.css']
})
export class AdminViewAllUsersComponent implements OnInit {
  users: User[]=[];
  constructor(private usr:UserServiceService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.usr.getAllUsers().subscribe((rtnUsrs)=>(this.users = rtnUsrs))
  }

  

}
