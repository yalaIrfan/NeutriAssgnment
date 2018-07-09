import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //
  @Output() changed: EventEmitter = new EventEmitter();
  formType: boolean = false;

  // formType => false for Registarion 
  // formType => true for Login 


  constructor() { }

  ngOnInit() {
  }


}
