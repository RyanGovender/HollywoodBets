import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../Models/Country';
import { Sports } from '../Models/Sports';
import { TournamentService } from './tournament.service';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient,private tournamentService:TournamentService) { }

  private _url = 'https://localhost:44330/api/sportcountry?sportId='; 
  private _jsonUrl = 'https://localhost:44330/api/sport';
  onClick = false;
  GetAllCountriesBasedOnSport(sportId:number):Observable<Country[]>
  {
     return this.http.get<Country[]>(this._url+sportId);
  }

  getSports():Observable<Sports[]>
  {
    return this.http.get<Sports[]>(this._jsonUrl);
  }

  clearList()
  {
    this.onClick = true;
    this.tournamentService.clearCountryBetSlip();
  }

 
}
