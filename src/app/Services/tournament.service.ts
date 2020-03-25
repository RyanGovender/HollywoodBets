import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Tournament} from '../Models/Tournament'
import { Country } from '../Models/Country';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http:HttpClient) { }

  private _url = 'https://localhost:44330/api/tournaments?';
  private _sportId = 'sportId=';
  private _countryId = '&countryId=';
  tournamentsList=[];
  

  getTournamentsBasedOnSportAndCountry(sportId:number,countryId:number):Observable<Tournament[]>
  {
     return this.http.get<Tournament[]>(`${this._url}${this._sportId}${sportId}${this._countryId}${countryId}`);
  }

  addToTournamentList(countryTournament:any) //first check if country is already in array if not then it adds country to array
  {
    this.checkIfCountryExist(countryTournament) ? this.removeFromClick(countryTournament) 
    : this.add(countryTournament);
  }

  add(countryTournament:any) // adds a country and its related tournaments to the array
  {
    this.tournamentsList.push(countryTournament); 
    this.updateBetId();
  }

  checkIfCountryExist(Selectedcountry:any):boolean // checks if a country exist in and already before adding to avoid duplicates.
  {
    var _itemId = false;
    for (let country = 0; country < this.tournamentsList.length; country++) {
      const element = this.tournamentsList[country];
      if(element.country.countryId == Selectedcountry.country.countryId)
      {
        _itemId = true;
         break; 
      }
    }
    return _itemId
  }

  removeFromClick(countryTournament) // removes a country when the used clicks on it twice.
  {
    for (let index = 0; index < this.tournamentsList.length; index++) {
      const element = this.tournamentsList[index];
      if(element.country.countryId ==countryTournament.country.countryId)
      {
        this.tournamentsList.splice(index,1);
      }
    }
    this.updateBetId();
  }

  updateBetId(){ //updates the ids of each item in an array so the values are always consistent 
    for (let index = 0; index < this.tournamentsList.length; index++) {
      const element = this.tournamentsList[index];
      element.id = index+1; // so the id starts from 1
    }
  }

  clearCountryBetSlip(){ //clears the  array mainly used when moving from sport to sport
    this.tournamentsList.splice(0,this.tournamentsList.length);
  }

  removeCountry(country:any)//removes a country and its tournaments when user click the X
  {
    const index = this.tournamentsList.indexOf(country);
    if(index!==-1) this.tournamentsList.splice(index,1);
    this.updateBetId();
  }

}
