import { Component, OnInit, Output, Input } from '@angular/core';
import { Country } from 'src/app/Models/Country';
import { CountryService } from 'src/app/Services/country.service';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'protractor';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(private countryService:CountryService,private route: ActivatedRoute) { }

  arrayCountries:Observable<Country[]>;
  selectedCountry:any;
  tempValue=0;
  private _nameOfSportId ='sportId';

  ngOnInit(): void {
   this.GetAllCountries();
  }

  ngDoCheck()
  {
    this.countryRefresh();
  }

  countryRefresh()//everytime a user clicks a sport on the side nav. OnClick becomes true and then it will hit the api tp get all the sports based on the sportId they chose.
  {
    if(this.countryService.onClick)
    {
      this.GetAllCountries();
      this.countryService.onClick = false; //changes onClick to false so the method does not hit the api unless the user chooses a new sport
    }
  }

  GetAllCountries() // Gets sports based on a sportId choosen by the user.
  {
    var sportId =+this.route.snapshot.paramMap.get(this._nameOfSportId);
    return this.countryService.GetAllCountriesBasedOnSport(sportId).subscribe((data:any)=>{
    this.arrayCountries = data;
    })
  }

  onSelected(data:any) // passes the selectedCountry value to the tournament component(child).
  {
    this.selectedCountry = data;
    this.tempValue++;
  }
}
