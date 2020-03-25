import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sports } from '../Models/Sports';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  private _jsonUrl = 'https://localhost:44330/api/sport';
  constructor(private http:HttpClient) { }

  getSports():Observable<Sports[]>
  {
    return this.http.get<Sports[]>(this._jsonUrl);
  }
}
