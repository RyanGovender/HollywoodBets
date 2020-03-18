import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { betSlip } from '../Models/betSlip';

@Injectable({
  providedIn: 'root'
})
export class SoccerMatchesService {

  constructor(private http:HttpClient) { }

  getSoccerMatches():Observable<betSlip[]>{
    return this.http.get<betSlip[]>("/assets/SoccerMatches.json");
  }
  
}
