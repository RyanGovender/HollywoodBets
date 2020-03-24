import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { SideNavService } from 'src/app/Services/side-nav.service';
import { Sports } from 'src/app/Models/Sports';
import { Observable,combineLatest } from 'rxjs';
import {FormControl} from '@angular/forms';
import {
  debounceTime, distinctUntilChanged, switchMap, startWith, map
} from 'rxjs/operators';
import { CountryService } from 'src/app/Services/country.service';


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
  

  constructor(private sidenavService:SideNavService,private countryService:CountryService) { }
  ngOnInit(): void {
    this.sideNavSearch();
  }

  onClick()
  {
    this.countryService.onClick = true;
  }

  GetAllSports(){
      return this.sidenavService.getSports().subscribe( (data:any)=>{
      this.arraySports = data;
    })
  }

  removeSpaceFromSportType(sportName:string)
  {
    return sportName.trim().replace(' ','-').toLocaleLowerCase();
  }
  sideNavSearch()
  {
    this.sports$ = this.sidenavService.getSports();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredSports$ = combineLatest(this.sports$, this.filter$).pipe(
      map(([sports, filterString]) => sports.filter(movies => movies.sportName.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
  }

}
