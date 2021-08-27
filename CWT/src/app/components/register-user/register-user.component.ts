import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  firstName : string = "";
  lastName : string = "";
  email : string = "";
  userName : string = "";
  passwordConfirm1 : string = "";
  passwordConfirm2 : string = "";

  RegisterNewAcct()
  {
      //Inserting into the database.
      //First, check if Confirm1 and Confirm2 are the same.
      if(this.passwordConfirm1 == this.passwordConfirm2)
      {
          //Okay, they match. Check the database if the userName is already taken.
          //On the assumption that they do, INSERT the variables
          /*
              number Rows With Username = 0
              Database Call with intent of returning an int of 0 or 1.
              if Rows With Username = 0
              {
                  Insert Database call, sending all variables.
                  Transition to next component (Map)
              }
              else
              {
                  User Name is already taken in this case.
                  Alert "User Name is already taken"
                  this.ResetForm();
              }
          */
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
    this.passwordConfirm1 = "";
    this.passwordConfirm2 = "";
  }
}

