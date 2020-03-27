import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { BetType } from 'src/app/Models/BetType';

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
  constructor(private route: ActivatedRoute,private eventService:EventService) { }

  ngOnInit(): void {
    this.getEvents();
    this.getBetTypes();
   // this.itemOne = this.betTypes[0].betTypeName;
  }

  getEvents() // gets all events for that tournament.
  {
     this.eventService.getAllEventsForTournament(this.getTournamentId()).subscribe(
       (data:any)=>{
         this.events = data;
       }
     );
  }

  getBetTypes()
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

}
