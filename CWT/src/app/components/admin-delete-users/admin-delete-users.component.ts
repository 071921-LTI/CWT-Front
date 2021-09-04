import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-delete-users',
  templateUrl: './admin-delete-users.component.html',
  styleUrls: ['./admin-delete-users.component.css']
})
export class AdminDeleteUsersComponent implements OnInit {
  users:User[]=[];
  message:string="asd";
  constructor(private mngUsr:UserServiceService) { }

  ngOnInit(): void {
    this.mngUsr.getAllUsers().subscribe((rtnUsrs)=>(this.users = rtnUsrs))
  }

  deleteUser(usrDlet:User){
    this.mngUsr.deleteUser(usrDlet).subscribe((msg) =>this.message = msg);
    window.location.reload();
  }
}
