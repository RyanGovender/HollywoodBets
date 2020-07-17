import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  today: number = Date.now();

  constructor(private _location:Location) { 
    setInterval(() => {this.today = Date.now()}, 1);
  }

  ngOnInit(): void {
  }

  goBack(){
   this._location.back();
  }

}
