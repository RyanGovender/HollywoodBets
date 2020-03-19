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
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http:HttpClient) { }

  getSports():Observable<Sports[]>
  {

    console.log(this.http.get(this._jsonUrl).subscribe((res:any)=>{
      console.log(res);
    }));
    
    return this.http.get<Sports[]>(this._jsonUrl);
  }
}
