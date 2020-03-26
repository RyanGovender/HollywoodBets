import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  private _tournamentId = 'tournamentId';
  events:Event[];
  constructor(private route: ActivatedRoute,private eventService:EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() // gets all events for that tournament.
  {
     this.eventService.getAllEventsForTournament(this.getTournamentId()).subscribe(
       (data:any)=>{
         this.events = data;
       }
     );
  }

  getTournamentId():number // gets the tournamentId from the Url
  {
    return +this.route.snapshot.paramMap.get(this._tournamentId);
  }

}
