import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private router: Router, private app : AppComponent)  { 

  }

  ngOnInit(): void {
  }

  firstName : string = "";
  lastName : string = "";
  email : string = "";
  userName : string = "";
  passwordConfirm1 : string = "";
  passwordConfirm2 : string = "";
  actualPassword : string = "";

  RegisterNewAcct()
  {
      //Inserting into the database.
      //First, check if Confirm1 and Confirm2 are the same.
      console.log("In Register");
      if(this.passwordConfirm1 == this.passwordConfirm2)
      {
          //Okay, they match.
          this.actualPassword = this.passwordConfirm2;
          console.log("Passwords Match");

          //Now let's register the user.
          let postURL = 'http://localhost:8080/users/';
          let reg_xhr = new XMLHttpRequest(); 
          let registerBody = `{"username":\"${this.userName}\",
                              "password":\"${this.actualPassword}\"}`;
          reg_xhr.open("POST",postURL);
          
          reg_xhr.setRequestHeader("Content-Type", "application/json");
          reg_xhr.send(registerBody);
          reg_xhr.onreadystatechange = () => {
            if(reg_xhr.readyState === 4 && reg_xhr.status >= 200 && reg_xhr.status < 300){
              //Register Successful! Transition to next component (Map)
              alert("Registration successful! Welcome to the Call Weather and Traffic app!")
              this.GetNewToken();
              this.router.navigate(['/',"Main"]);
            }
            else if(reg_xhr.readyState === 4){
              //What happened here?
              console.log("Something went wrong with Registering");
              alert(reg_xhr.responseText);
              this.ResetForm();
            }
          }
      }
      else
      {
          //The passwords do not match, clear the form.
          alert("Your passwords do not match.");
          this.ResetForm();
      }
  }
  ResetForm() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.userName = "";
    this.passwordConfirm1 = "";
    this.passwordConfirm2 = "";
  }

  GetNewToken() {
    
  }
}

 

