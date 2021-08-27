import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  userName : string = "";
  passWord : string = "";

  Attempt_LogIn()
  {
      /*
        Database call, sending in userName and passWord, assuming return true.
        if successful
        {
           Transition to next component (Map)
        }
        else
        {
            alert("Invaild User Name and/or Pass Word")
        }
      */
  }
}
