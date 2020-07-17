import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BetType } from '../Models/BetType';
import { threadId } from 'worker_threads';
import { Tournament } from '../Models/Tournament';
import { Country } from '../Models/Country';
import { Market } from '../Models/Market';
import { MarketOdds } from '../Models/MarketOdds';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _url ='https://localhost:44330/api/';
  private _controllerEvents ='event?';
  private _controllerTournaments='BetType/GetBetTypes?';
  private _getTournaments='tournaments/GetTournament?';
  private params1='tournamentId=';
  private _getCountry='SportCountry/GetCountryBasedOnTournament?';

  constructor(private _http:HttpClient) { }

  getAllEventsForTournament(tournamentId:number):Observable<Event[]>//Get the events for a tournament back from the api
  {
      return this._http.get<Event[]>(this.generateUrl(this._controllerEvents,tournamentId)).pipe(
        catchError(this.handleError)
      );;
  }

  getAllBetTypes(tournamentId:number):Observable<BetType[]> // Get the bet types for the choosen tournament
  {
      return this._http.get<BetType[]>(this.generateUrl(this._controllerTournaments,tournamentId));
  }

  getTournament(tournamentId:number):Observable<Tournament> // get details about the tournament.. used for display
  {
     return this._http.get<Tournament>(this.generateUrl(this._getTournaments,tournamentId));
  }

  getCountry(tournamentId:number):Observable<Country>// gets the country the tournament is held in.. used for displying country flag
  {
    return this._http.get<Country>(this.generateUrl(this._getCountry,tournamentId));
  }

  getMarkets(betTypeId:number):Observable<Market[]>
  {
    return this._http.get<Market[]>(this._url+'Market/GetMarkets?betTypeId='+betTypeId);
  }

  private generateUrl(apiLocation:string,tournamentId:number):string //creates the url to hit the api based on default values and two params.
  {
    return this._url+apiLocation+this.params1+tournamentId;
  }

  getOdds(tournamentId:number):Observable<MarketOdds[]>
  {
    return this._http.get<MarketOdds[]>("https://localhost:44330/api/odds?tournamentId="+tournamentId).pipe(
      catchError(this.handleError)
    );;
  }

  
  handleError(error: HttpErrorResponse){
    console.log(error);
      return of([]);
    }
    
 
}
