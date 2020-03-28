import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BetType } from '../Models/BetType';
import { threadId } from 'worker_threads';
import { Tournament } from '../Models/Tournament';
import { Country } from '../Models/Country';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _url ='https://localhost:44330/api/';
  private _controllerEvents ='event?';
  private _controllerTournaments='tournaments/GetBetTypes?';
  private _getTournaments='tournaments/GetTournament?';
  private params1='tournamentId=';
  private _getCountry='tournaments/GetCountryBasedOnTournament?';

  constructor(private _http:HttpClient) { }

  getAllEventsForTournament(tournamentId:number):Observable<Event[]>//Get the events for a tournament back from the api
  {
      return this._http.get<Event[]>(this.generateUrl(this._controllerEvents,tournamentId));
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

  private generateUrl(apiLocation:string,tournamentId:number):string //creates the url to hit the api based on default values and two params.
  {
    return this._url+apiLocation+this.params1+tournamentId;
  }
 
}
