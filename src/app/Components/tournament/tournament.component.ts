import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/Services/tournament.service';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/Models/Tournament';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournaments:Observable<Tournament[]>;
  constructor(private tournamentService:TournamentService) { }

  ngOnInit(): void {
    this.getTournaments();
    }

  getTournaments()
  {
    var sportId =5;
    var countryId =1;
    return this.tournamentService.getTournamentsBasedOnSportAndCountry(sportId,countryId).subscribe((data:any)=>{
      this.tournaments = data;
      console.log(data)
    })
  }


}
