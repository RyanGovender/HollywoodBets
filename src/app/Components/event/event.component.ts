import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { BetType } from 'src/app/Models/BetType';
import { Tournament } from 'src/app/Models/Tournament';
import { Country } from 'src/app/Models/Country';
import { Market } from 'src/app/Models/Market';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  private _tournamentId = 'tournamentId';
  events:Event[];
  betTypes:BetType[];
  itemOne:string;
  tournament:Tournament;
  country:Country;
  markets:any;
  constructor(private route: ActivatedRoute,private eventService:EventService) { }

  ngOnInit(): void {
    this.getEvents();
    this.getBetTypes();
    this.getTournamentDetails();
    this.getCountry();
  }

  getEvents() // gets all events for that tournament.
  {
     this.eventService.getAllEventsForTournament(this.getTournamentId()).subscribe(
       (data:any)=>{
         this.events = data;
       }
     );
  }

  getBetTypes() // get all bet types for that tournament
  {
    this.eventService.getAllBetTypes(this.getTournamentId()).subscribe(
      (data:any)=>{
        this.betTypes = data;
        this.itemOne = this.betTypes[0].betTypeName;
        this.getMarketsBasedOnBetType(this.betTypes[0].betTypeId);
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

getMarketsBasedOnBetType(betType:number) // get the markets based on what bet type the user choose.
{
  this.eventService.getMarkets(betType).subscribe(
    (data:any)=>{
     this.markets = data;
    }
  );
  this.itemOne = this.betTypes[betType-1].betTypeName;//set the dropdown to current item
}

setMarketTypeName(eventName:string,marketType:string):string // replaces home or away and add team names
{
    var teamName = eventName.split('vs');
    if(marketType.includes('Home')) marketType =  marketType.replace('Home',teamName[0]);

    if(marketType.includes('Away')) marketType = marketType.replace('Away',teamName[1]);

     return marketType;
 
}
}
