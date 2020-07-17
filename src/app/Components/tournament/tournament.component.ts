import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TournamentService } from 'src/app/Services/tournament.service';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/Models/Tournament';
import { ActivatedRoute } from '@angular/router';

import { Country } from 'src/app/Models/Country';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import * as Actions from '/Users/21614/Desktop/Angular/HollywoodBets/src/app/Store/actions/sportTree.actions';

export interface CountryTournament{
  id:number;
  country:Country;
  tournaments:Observable<Tournament[]>;
}

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})

export class TournamentComponent  {

  @Input()
  selectedCountry:any;
  @Input()
  tempValue:number;

 
  tournaments:Observable<Tournament[]>;
  finalTournaments:any[];
  private _value:CountryTournament;
  private _previousSelectedCountryValue:any;
  private _nameOfSportId ='sportId';
  _flag = false;
  
  constructor(private tournamentService:TournamentService,private route: ActivatedRoute, private store:Store<AppState>) { 
    this.store.select(state=> state.sportsTree)
    .subscribe((data:any)=>{
    this.tournaments = data;
  });
  }

  async update()
  { 
    await this.tournaments;
    console.log(this.tournaments);
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

    ngOnChanges()
    {
         this.store.dispatch(new Actions.GetSportTree(this.getSportId(),this.selectedCountry.countryId));
         this.waitForOneSecond().then((value) => 
         {
           this.checkIfSelectedCountryUndefined();
           this.addToList();
        }
           );
         this.finalTournaments = this.tournamentService.tournamentsList; //refreshes the list after each change to the modal.
    }

    checkIfSelectedCountryUndefined() // checks if selectedCountry is undefined. If it is undefined then it will assigned it to the previous country value.
    {                                // previous country value is stored as ngDoChanges does not recognize (undefined) if same item is clicked twice.
      this.selectedCountry == undefined ? this.selectedCountry = this._previousSelectedCountryValue:
      this._previousSelectedCountryValue = this.selectedCountry;
    }

    getSportId():number // gets the sportId for the url based on the sport the user chose.
    {
       return +this.route.snapshot.paramMap.get(this._nameOfSportId);
    }

    addToList() //creates an instance of the countryTournament interface and pushes to the service
    {
        this._value = {
          id:1,//so its never equal to an item on the list.
           country: this.selectedCountry,
           tournaments : this.tournaments
         }
         this.tournamentService.addToTournamentList(this._value);
    }

    removeCountryFromList(country:any) // remove an item from the array. Based on user clicking X in view.
    {
      this.tournamentService.removeCountry(country);
    }
    removeSpaceFromTournament(sportName:string)
  {
    return sportName.trim().replace(' ','-').toLocaleLowerCase();
  }
}
