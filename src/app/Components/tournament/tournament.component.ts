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
  @Input()
  tempValue:number;

 
  tournaments:Tournament[];
  _value:CountryTournament;
  finalTournaments:any[];
  private _previousSelectedCountryValue:any;
  private _sportId = +this.route.snapshot.paramMap.get('sportId');
  

  constructor(private tournamentService:TournamentService,private route: ActivatedRoute) { }

    ngOnChanges()
    {
         this.checkIfSelectedCountryUndefined();
         this.getAddData(this.selectedCountry,this._sportId);
         this.finalTournaments = this.tournamentService.tournamentsList; //refreshes the list after each change to the modal.
    }

    checkIfSelectedCountryUndefined() // checks if selectedCountry is undefined. If it is undefined then it will assigned it to the previous country value.
    {                                // previous country value is stored as ngDoChanges does not recognize (undefined) if same item is clicked twice.
      this.selectedCountry == undefined ? this.selectedCountry = this._previousSelectedCountryValue:
      this._previousSelectedCountryValue = this.selectedCountry;
    }

    getAddData(country:any,id:number) // hits the api and returns the tournaments based on sport and country. Then it calls the add method to add this data to the array.
    {
        if(this.selectedCountry !=null )
        return this.tournamentService.getTournamentsBasedOnSportAndCountry(id,country.countryId).subscribe((data:any)=>{
        this.tournaments = data;
        this.addToList(this.selectedCountry,data);
      });
    }

    addToList(country:any,tournament:Tournament[]) //creates an instance of the countryTournament interface and pushes to the service
    {
        this._value = {
          id:this.finalTournaments.length+1,//so its never equal to an item on the list.
           country: country,
           tournaments : tournament
         }
         this.tournamentService.addToTournamentList(this._value);
    }

    removeCountryFromList(country:any) // remove an item from the array. Based on user clicking X in view.
    {
      this.tournamentService.removeCountry(country);
    }
}
