import { Component, OnInit } from '@angular/core';
import { SoccerEvent } from 'src/app/Models/SoccerEvent';
import { SoccerMatchesService } from 'src/app/Services/soccer-matches.service';
import { BetslipService } from 'src/app/Services/betslip.service';

@Component({
  selector: 'app-todays-soccer',
  templateUrl: './todays-soccer.component.html',
  styleUrls: ['./todays-soccer.component.css']
})
export class TodaysSoccerComponent implements OnInit {

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
