import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TournamentService } from 'src/app/Services/tournament.service';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/Models/Tournament';
import { ActivatedRoute } from '@angular/router';

import { Country } from 'src/app/Models/Country';
import { element } from 'protractor';
import { count } from 'rxjs/operators';


export interface CountryTournament{
  id:number;
  country:Country;
  tournaments:Tournament[];
}

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})

export class TournamentComponent {

  @Input()
  selectedCountry:any;
 
  tournaments:Tournament[];
  _value:CountryTournament;
  finalTournaments:any[];

  constructor(private tournamentService:TournamentService,private route: ActivatedRoute) { }

    ngOnChanges(change:SimpleChanges)
    {
     if(this.selectedCountry!=null)
     {
      this.add(this.selectedCountry,+this.route.snapshot.paramMap.get('sportId'));
      this.finalTournaments = this.tournamentService.tournamentsList;
     }
    }

    add(country:any,id:number)
    {
        return this.tournamentService.getTournamentsBasedOnSportAndCountry(id,country.countryId).subscribe((data:any)=>{
        this.tournaments = data;
        this.addToList(this.selectedCountry,data);
      })
    }

    remove(country:any)
    {
      this.tournamentService.removeCountry(country);
    }

  addToList(country:any,tournament:Tournament[])
  {
      this._value = {
        id:this.finalTournaments.length+1,
         country: country,
         tournaments : tournament
       }
       this.tournamentService.addToTournamentList(this._value);
  }



}
