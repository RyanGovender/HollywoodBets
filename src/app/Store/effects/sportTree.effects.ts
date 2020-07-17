import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ActionTypes } from '../actions/sportTree.actions';
import * as Action from '../actions/sportTree.actions';
import { CountryService } from 'src/app/Services/country.service';
import { Sports } from 'src/app/Models/Sports';
import { Tournament } from 'src/app/Models/Tournament';
import { TournamentService } from 'src/app/Services/tournament.service';

@Injectable()
export class SportTreeEffects{


    @Effect()
    loadSportTree$ = this.actions$.pipe(
        ofType(ActionTypes.GET_SPORTS),
        switchMap((action:Action.GetSportTree)=>
        this.countryService.getTournamentsBasedOnSportAndCountry(action.sportId,action.countryID).pipe(
            map((sportTree:Tournament[]) => new Action.GetSportTreeSuccess(sportTree))
        )
      )
    );


    constructor(private actions$:Actions,private countryService:TournamentService){}

    
}