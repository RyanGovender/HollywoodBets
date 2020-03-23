import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from 'src/app/Services/tournament.service';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/Models/Tournament';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  @Input()
  selectedCountry:any;
  tournaments:Observable<Tournament[]>;
  constructor(private tournamentService:TournamentService,private route: ActivatedRoute) { }

    ngOnInit(): void {
     this.getTournaments();
    }

    ngOnChanges()
    {
     this.getTournaments();
    }

    // ngAfterContentChecked()
    // {
    //   this.getTournaments();
    // }

  getTournaments()
  {
      var sportId =+this.route.snapshot.paramMap.get('sportId');
        var countryId =+this.selectedCountry.countryId;
        return this.tournamentService.getTournamentsBasedOnSportAndCountry(sportId,countryId).subscribe((data:any)=>{
        this.tournaments = data;
        console.log(data)
      })
  }


}
