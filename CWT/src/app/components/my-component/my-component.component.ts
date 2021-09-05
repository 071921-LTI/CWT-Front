import { Component, OnInit } from "@angular/core";
import { Trip } from "src/app/models/trip";

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