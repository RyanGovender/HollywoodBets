import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../Models/Country';
import { Sports } from '../Models/Sports';
import { TournamentService } from './tournament.service';
import { catchError } from 'rxjs/operators';


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
     return this.http.get<Country[]>(this._url+sportId).pipe(
       catchError(this.handleError)
     );
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

  handleError(error: HttpErrorResponse){
    console.log(error);
      return of([]);
    }

 
}
