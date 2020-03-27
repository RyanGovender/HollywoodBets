import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BetType } from '../Models/BetType';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _url ='https://localhost:44330/api/';
  private _controllerEvents ='event?';
  private _controllerTournaments='tournaments/GetBetTypes?';
  private params1='tournamentId=';

  constructor(private _http:HttpClient) { }

  getAllEventsForTournament(tournamentId:number):Observable<Event[]>//Get the data back from the api
  {
      return this._http.get<Event[]>(this._url+this._controllerEvents+this.params1+tournamentId);
  }

  getAllBetTypes(tournamentId:number):Observable<BetType[]>
  {
      return this._http.get<BetType[]>(this._url+this._controllerTournaments+this.params1+tournamentId);
  }
 
}
