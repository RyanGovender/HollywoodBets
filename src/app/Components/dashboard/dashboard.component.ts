import { Component, OnInit } from '@angular/core';
import { SoccerMatchesService } from 'src/app/Services/soccer-matches.service';
import { SoccerEvent } from 'src/app/Models/SoccerEvent';
import { BetslipComponent } from '../betslip/betslip.component';
import { BetslipService } from 'src/app/Services/betslip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  soccerMatches:SoccerEvent[];
  constructor(private soccerMatchService:SoccerMatchesService,private betslip:BetslipService) { }

  ngOnInit(): void {
    this.getAllSoccerMatchesForBetCardOne();
  }

  getAllSoccerMatchesForBetCardOne(){
    return this.soccerMatchService.getSoccerMatches().subscribe((res:any)=>{
     this.soccerMatches = res;
    })
  }

  addEventToBetSlip(event:any,punterchoice:string,odds:number){
    this.betslip.addToBetSlip(event,punterchoice,odds,'Soccer');
  }

}
