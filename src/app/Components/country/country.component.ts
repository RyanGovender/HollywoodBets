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

  ngOnInit(): void {
   this.GetAllCountries();
  }

  ngDoCheck()
  {
    this.countryRefresh();
  }

  GetAllCountries()
  {
    var sportId =+this.route.snapshot.paramMap.get('sportId');
    return this.countryService.GetAllCountriesBasedOnSport(sportId).subscribe((data:any)=>{
    this.arrayCountries = data;
    })
  }

  countryRefresh()
  {
    if(this.countryService.onClick)
    {
      this.GetAllCountries();
      this.countryService.onClick = false;
    }
  }

  onSelected(data:any)
  {
     this.selectedCountry = data;
  }




}
