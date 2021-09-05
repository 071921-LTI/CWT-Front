import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users';

let token = sessionStorage.getItem("token");

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': String(token),
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url = 'http://localhost:8080/users';

  constructor(private http :HttpClient) { }
  
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url+"/all",httpOptions)
  }

  deleteUser(usr:User):Observable<string>{
    return  this.http.delete<string>(this.url+"/dlt/"+usr.id,httpOptions)
  }
}
