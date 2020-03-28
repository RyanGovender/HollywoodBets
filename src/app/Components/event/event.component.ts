import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { BetType } from 'src/app/Models/BetType';
import { Tournament } from 'src/app/Models/Tournament';
import { Country } from 'src/app/Models/Country';

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
}
