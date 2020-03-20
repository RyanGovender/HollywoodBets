import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../Models/Country';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  private _url = 'https://localhost:44330/api/sportcountry?id='; 
  GetAllCountriesBasedOnSport(sportId:number):Observable<Country[]>
  {
     return this.http.get<Country[]>(this._url+sportId);
  }
}
