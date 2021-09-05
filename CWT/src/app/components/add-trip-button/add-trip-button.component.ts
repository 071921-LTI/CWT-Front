import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-trip-button',
  templateUrl: './add-trip-button.component.html',
  styleUrls: ['./add-trip-button.component.css']
})
export class AddTripButtonComponent implements OnInit {

  @Input() currLoc:string=""
  @Input() dest:string=""
  @Input() tTime:number = 0;
  @Input() token:string=""

  constructor() { }
  @Output() btnClick = new EventEmitter();
  ngOnInit(): void {
  }

  clickAction(){
    this.btnClick.emit()
  }

}
