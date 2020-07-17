import { Action } from '@ngrx/store'
import * as Actions from '../actions/sportTree.actions';
import { Sports } from 'src/app/Models/Sports';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/Models/Tournament';

export const initialState : Tournament ={
   tournamentId:0,
   tournamentName:''
};

export function reducer(state: Tournament[] = [initialState], action: Actions.ActionUnion){

    switch(action.type)
    {
        case Actions.GET_SPORTS_SUCCESS:
            return action.payload;

            default:
                return state;
    }


}