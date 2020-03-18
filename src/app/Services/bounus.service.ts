import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bounus} from '../Models/Bounus';

@Injectable({
  providedIn: 'root'
})
export class BounusService {

  constructor(private http:HttpClient) { }

  private _url = '/assets/Bounus.json';

  getAllBounus():Observable<Bounus[]>{
    return this.http.get<Bounus[]>(this._url);
  }

}
