import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TournamentService } from 'src/app/Services/tournament.service';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/Models/Tournament';
import { ActivatedRoute } from '@angular/router';

import { Country } from 'src/app/Models/Country';
import { element } from 'protractor';


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
  count=1;
  finalTournaments:any[];

  constructor(private tournamentService:TournamentService,private route: ActivatedRoute) { }

    ngOnChanges(change:SimpleChanges)
    {
     if(this.selectedCountry!=null)
     {
      this.add(this.selectedCountry,+this.route.snapshot.paramMap.get('sportId'));
      // this.addToList(this.selectedCountry,this.tournaments);
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

    remove(id:number)
    {
      const found = this.finalTournaments.findIndex(element => +element.country.countryId==id);
      this.finalTournaments.splice(found,1);
    }
  addToList(country:any,tournament:Tournament[])
  {
    const found = this.finalTournaments.findIndex(element => +element.country.countryId==country.countryId);
    if(found>=0){
      this.finalTournaments.splice(found,1);
    }
    else{
      this._value = {
        id:this.count,
         country: country,
         tournaments : tournament
       }
  
       this.tournamentService.addToTournamentList(this._value);
       this.count++;
    }
    
  }

}
