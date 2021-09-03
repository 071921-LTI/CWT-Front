import { Component, Input, OnInit } from "@angular/core";
import { Trip } from "src/app/trip";

@Component({
    selector: 'app-mycomp',
    template: '',
    styleUrls: [],
})
export class MyComponentComponent implements OnInit{
    utrip:Trip[]=[]
    constructor() {}
    ngOnInit(){

    }
}