import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  constructor() { }
  @Output() btnClick = new EventEmitter();
  ngOnInit(): void {
  }

  clickAction(){
    this.btnClick.emit()
  }

}
