import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { SideNavService } from 'src/app/Services/side-nav.service';
import { Sports } from 'src/app/Models/Sports';
import { Observable,combineLatest,of,from } from 'rxjs';
import {FormControl} from '@angular/forms';
import {
  debounceTime, distinctUntilChanged, switchMap, startWith, map
} from 'rxjs/operators';
import { CountryService } from 'src/app/Services/country.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import * as Actions from '/Users/21614/Desktop/Angular/HollywoodBets/src/app/Store/actions/sportTree.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  arraySports:Sports[];
  sports$:Observable<Sports[]>;
  filteredSports$:Observable<Sports[]>;
  filter: FormControl;
  filter$:Observable<string>;
  sportsTree$:Observable<Sports[]>;
  

  constructor(private countryService:CountryService) {
    // store.select(state=> state.sportsTree)
    // .subscribe((data:any)=>{
    //   this.sports$ = data;
    //   this.update();
    // });
    //   this.update();
   }


  ngOnInit(): void {
    this.sideNavSearch();
  //  this.store.dispatch(new Actions.GetSportTree());
  }

  update()
  {
    console.log(this.sports$);
    //console.log(this.getOb());
  }

  getOb()
  {
      const arraySource = from(this.sports$);
       arraySource.subscribe((val:any)=> {
        this.sports$ = val;
      });

  }

  onClick()
  {
    this.countryService.clearList();
  }

  removeSpaceFromSportType(sportName:string)
  {
    return sportName.trim().replace(' ','-').toLocaleLowerCase();
  }
  sideNavSearch()
  {
    this.sports$ = this.countryService.getSports();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredSports$ = combineLatest(this.sports$, this.filter$).pipe(
      map(([sports, filterString]) => sports.filter(movies => movies.sportName.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
  }

}
