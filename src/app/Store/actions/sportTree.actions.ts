import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Sports } from 'src/app/Models/Sports';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/Models/Tournament';

export const GET_SPORTS = '[SPORT] GET';
export const GET_SPORTS_SUCCESS = '[SPORT] GET SUCCESS';

export enum ActionTypes{
    GET_SPORTS = '[SPORT] GET',
    GET_SPORTS_SUCCESS = '[SPORT] GET SUCCESS'
}

export class GetSportTree implements Action {
    readonly type = ActionTypes.GET_SPORTS
    constructor(public sportId:number,public countryID:number){}
}

export class GetSportTreeSuccess implements Action{
    readonly type = ActionTypes.GET_SPORTS_SUCCESS
    constructor(public payload:Tournament[]){}
}

export type ActionUnion = GetSportTree | GetSportTreeSuccess;