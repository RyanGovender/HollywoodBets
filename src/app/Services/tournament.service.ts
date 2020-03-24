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

  getTournaments(sportId:number,countryId:number):any
  {
        return this.http.get<Tournament[]>(`${this._url}${this._sportId}${sportId}${this._countryId}${countryId}`);
  }

  addToTournamentList(countryTournament:any)
  {
       this.tournamentsList.push(countryTournament);
  }

}
