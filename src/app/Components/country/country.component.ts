import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/Models/Country';
import { CountryService } from 'src/app/Services/country.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(private countryService:CountryService,private route: ActivatedRoute) { }

  arrayCountries:Country[];
  ngOnInit(): void {
   this.GetAllCountries();
  }
  ngAfterContentChecked(){

 //   this.GetAllCountries();
  }
  
  GetAllCountries()
  {
    var sportId =+this.route.snapshot.paramMap.get('sportId');
    return this.countryService.GetAllCountriesBasedOnSport(sportId).subscribe((data:any)=>{
     this.arrayCountries = data;
    })
  }

}
