import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';

export interface DateEvents{
  id:number;
  date:Date;
  event:Event[];
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  private _tournamentId = 'tournamentId';
  events:Event[];
  dateEvents:DateEvents[];
  constructor(private route: ActivatedRoute,private eventService:EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents()
  {
     this.eventService.getAllEventsForTournament(this.getTournamentId()).subscribe(
       (data:any)=>{
         this.events = data;
       }
     );
  }

  getTournamentId():number
  {
    return +this.route.snapshot.paramMap.get(this._tournamentId);
  }

  getAll()
  {
    for (let index = 0; index < this.events.length; index++) {
      const element = this.events[index];
      if()
      
    }
  }

}
