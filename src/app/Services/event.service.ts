import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _url ='https://localhost:44330/api/event?';
  private params1='tournamentId=';

  constructor(private _http:HttpClient) { }

  getAllEventsForTournament(tournamentId:number):Observable<Event[]>
  {
      return this._http.get<Event[]>(this._url+this.params1+tournamentId);
  }
 
}
