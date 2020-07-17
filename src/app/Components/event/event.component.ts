import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { BetType } from 'src/app/Models/BetType';
import { Tournament } from 'src/app/Models/Tournament';
import { Country } from 'src/app/Models/Country';
import { Market } from 'src/app/Models/Market';
import { MarketOdds } from 'src/app/Models/MarketOdds';
import { templateJitUrl } from '@angular/compiler';
import { BetslipService } from 'src/app/Services/betslip.service';
import { betSlip } from 'src/app/Models/betSlip';
import { SoccerEvent } from 'src/app/Models/SoccerEvent';
import { Console } from 'console';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  private _tournamentId = 'tournamentId';
  private _typeOfSport = 'sportName';
  events:Event[];
  betTypes:BetType[];
  itemOne:string;
  tournament:Tournament;
  country:Country;
  markets:any;
  marketOdds:MarketOdds[] =[];
  displayMarket:MarketOdds[] =[];
  betTypeId = 1;
  betslipInterface:betSlip;
  soccerEvent:SoccerEvent;
  sportName:string;
  eventLen=0;
  constructor(private route: ActivatedRoute,private eventService:EventService,private betslip:BetslipService) { }

  ngOnInit(): void {
    this.getOdds();
    this.getEvents();
    this.getBetTypes();
    this.getTournamentDetails();
    this.getCountry();
    
  }

  addEventToBetSlip(events:any,punterchoice:string,odds:number){

        this.sportName = this.route.snapshot.paramMap.get(this._typeOfSport).toLocaleUpperCase();
        this.soccerEvent ={
        id:events.eventId,
        countryCode:this.country.countryName,
        leagueName:this.tournament.tournamentName,
        time:events.eventDate,
        homeTeam:this.splitTeams(events.eventName,0),
        awayTeam:this.splitTeams(events.eventName,1),
        homePrice:Number(this.tournament.tournamentId),
        awayPrice:0,
        draw:0
        };

        punterchoice = `${this.itemOne} - ${punterchoice}`;

    this.betslip.addToBetSlip(this.soccerEvent,punterchoice,odds,this.sportName);
  }

  splitTeams(event:string,homeOrAway:number)
  {
    const teams=  event.split('vs');
    if(teams.length==1) return teams[0];
    return teams[homeOrAway];
  }

  getEvents() // gets all events for that tournament.
  {

     this.eventService.getAllEventsForTournament(this.getTournamentId()).subscribe(
       (data:any)=>{
         this.events = data;
         if(data!=undefined)
         {
           this.eventLen = this.events.length;
         }
         else{
           this.eventLen = 0;
         }
       }
     );
  }

  getOdds()
  {
    this.eventService.getOdds(this.getTournamentId()).subscribe(
      (data:any)=>{
          this.marketOdds = data;
      }
    );
    
  }

  getBetTypes() // get all bet types for that tournament
  {
    this.eventService.getAllBetTypes(this.getTournamentId()).subscribe(
      (data:any)=>{
        this.betTypes = data;
        this.itemOne = this.betTypes[0].betTypeName;
        this.getMarketsBasedOnBetType(this.betTypes[0]);
      }
    );
  }


  getTournamentId():number // gets the tournamentId from the Url
  {
    return +this.route.snapshot.paramMap.get(this._tournamentId);
  }
  
  getTournamentDetails() // gets the details of the tournaments
  {
     this.eventService.getTournament(this.getTournamentId()).subscribe(
       (data:any)=>{
         this.tournament = data;
       }
     );
  }

getCountry() //gets the country of where the tournament is held.
{
  this.eventService.getCountry(this.getTournamentId()).subscribe(
    (data:any)=>{
      this.country = data;
    }
  );
}

getMarketsBasedOnBetType(betType:BetType) // get the markets based on what bet type the user choose.
{
  
  this.eventService.getMarkets(betType.betTypeId).subscribe(
    (data:any)=>{
     this.markets = data;
    }
  );
  this.itemOne = betType.betTypeName;//set the dropdown to current item
  this.betTypeId = betType.betTypeId;
}

setMarketTypeName(eventName:string,marketType:string):string // replaces home or away and add team names
{
    var teamName = eventName.split('vs'); //splits by the word vs and saves home team [0] and away team[1]
    if(marketType.includes('Home')) marketType =  marketType.replace('Home',teamName[0]);

    if(marketType.includes('Away')) marketType = marketType.replace('Away',teamName[1]);

     return marketType;
}

getMarketsForEvent(eventId)
{
      this.displayMarket = this.marketOdds.filter(x=>x.betTypeId == this.betTypeId && x.eventId == eventId);
}

}
