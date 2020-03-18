import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sports } from '../Models/Sports';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  private _jsonUrl = '/assets/Sports.json';

  constructor(private http:HttpClient) { }

  getSports():Observable<Sports[]>
  {
    return this.http.get<Sports[]>(this._jsonUrl);
  }
}
