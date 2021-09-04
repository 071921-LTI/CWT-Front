import { Component, OnInit, Output, Input,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private router: Router, private token : AppComponent) {
    console.log(token.googleMapsUrl);
  }

  ngOnInit(): void {
  }

  userName : string = "";
  passWord : string = "";

  Attempt_LogIn()
  {
    console.log("In Attempt LogIn");

    let apiURL = 'http://localhost:8080/auth';
    let xhr = new XMLHttpRequest();
    let requestBody = `{"username":\"${this.userName}\","password":\"${this.passWord}\"}`;
    //Database call, sending in userName and passWord, assuming return true.

    xhr.open("POST", apiURL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(requestBody);

    xhr.onreadystatechange = () => {
      console.log("Got here!");
      if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300){
           //Transition to next component (Map)
           let response = xhr.getResponseHeader("Authorization");
           this.token.token = response;   
          //  console.log("Token Acquired:{" + this.token.token + "}");
          //  console.log(response?.slice(1))
           switch(response?.slice(1)){
            case ":ADMIN":
              this.router.navigate(['/',"Admin"]);
              break;
            case ":BASIC_USER":
              this.router.navigate(['/',"Main"])
            break;

           }    
            
      }
      else if(xhr.readyState === 4)
      {
        //Invalid User name or Password. Either way, it failed.
        alert("Invalid User Name and/or password")
        //Reset the form while we're at it.
        this.ResetForm();
      }
    }
  }
  ResetForm() {
    this.userName = "";
    this.passWord = "";
  }
}
