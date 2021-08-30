import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private router: Router)  { 

  }

  ngOnInit(): void {
  }

  id : number = 0;
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
          //Get the count of users in DB
          let counterURL = 'http://localhost:8080/users/count';
          let xhr_Counter = new XMLHttpRequest();
          xhr_Counter.open("GET", counterURL);
          xhr_Counter.setRequestHeader("Content-Type", "application/json");
          xhr_Counter.send();
          xhr_Counter.onreadystatechange = () => {
            if(xhr_Counter.readyState === 4 && xhr_Counter.status >= 200 && xhr_Counter.status < 300){
              //Got it. Now increment ID by 1.
              console.log("Obtained count of numbers(" + xhr_Counter.response + ")");
              let inc_Id = xhr_Counter.response;
              this.id = inc_Id + 1;
            }
            else if(xhr_Counter.readyState === 4){
              //How did this go wrong...?
              console.log("Something went wrong in getting the number of users in the DB");
              this.ResetForm();
            }
          }

          //Now let's register the user.
          let postURL = 'http://localhost:8080/users/';
          let reg_xhr = new XMLHttpRequest(); 
          let registerBody = `{"id":${this.id},
                              "username":\"${this.userName}\",
                              "password":\"${this.actualPassword}\"}`;
          reg_xhr.open("POST",postURL);
          
          reg_xhr.setRequestHeader("Content-Type", "application/json");
          reg_xhr.send(registerBody);
          reg_xhr.onreadystatechange = () => {
            if(reg_xhr.readyState === 4 && reg_xhr.status >= 200 && reg_xhr.status < 300){
              //Register Successful! Transition to next component (Map)
              alert("Registration successful! Welcome to the Call Weather and Traffic app!")
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
    this.id = 0;
  }
}

