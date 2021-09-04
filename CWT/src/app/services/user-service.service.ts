import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey',
    'userid': '1'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = 'http://localhost:8080/users';

  constructor(private http :HttpClient) { }


  
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url+"/all")
  }

  deleteUser(usr:User):Observable<string>{
    return  this.http.delete<string>(this.url+"/dlt/"+usr.id)
  }
}
