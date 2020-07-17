import { Injectable } from '@angular/core';
import { betSlip } from '../Models/betslip';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestData } from '../Models/TestData';
import { Event } from '../Models/Event';
import { PunterBetSlip, BetSlipViewModel } from '../Models/BetSlipViewModel';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetslipService {

  item=[];
  finalTotal=0;
  _idCounter=1;
  _value: betSlip;
  realtedBetsSlipId =[];
betConfirmationMessage:string;

  multipleStake:number;
  multiplePayout:number;

  constructor(private http:HttpClient) { }

  PostToDb(betslip:PunterBetSlip)
  {
    for(let i=0;i< this.item.length;i++)
    {
      const element = this.item[i];
      element.event = this.convertBetToEventInBetSlip(element.event);
    }

    const finalbetSlip :BetSlipViewModel ={
      betslips:this.item,
      punterBetSlip:betslip
    }

  return this.http.post<betSlip>('https://localhost:44330/api/betslip/Post',finalbetSlip).pipe(
    catchError(this.handleError)
  );
  }

  convertBetToEventInBetSlip(bet:any)
  {
      const event :Event ={
        tournamentID:bet.homePrice,
        eventID:bet.id,
        eventName:this.concatinateEventName(bet.homeTeam,bet.awayTeam),
        eventDate:bet.time
      };

      return event;
  }

  concatinateEventName(home:string,away:String)
  {
    return away!=null? `${home} vs ${away}`:home;
  }

  calculateMutiplePayout(punterStake:number, finalOdds:number)
  {
      return this.multiplePayout = punterStake *finalOdds;
  }

  calculateMultipleStake(punterPayout:number,finalOdds:number)
  {
    return this.multipleStake = Math.round(Number((punterPayout/finalOdds)*100))/100
  }

  addToBetSlip(bet:any,punterchoice:string,odds:number,typeOfSport:string)
  {
    if(!this.checkIfBetExist(bet,punterchoice))
    {
      this._value ={
        id:this._idCounter,
        typeOfEvent:typeOfSport,
        event:bet,
        punterBetSelection:punterchoice,
        selctionOdds:odds,
        relatedGamesMessage:null,
        warning:false,
        stake:0,
        payout:0
      };
      this.item.push(this._value);
      console.log(this._value);

      this._idCounter++;
      this.updateBetId();
      }
  }

  checkIfBetExist(bet:any,punterChoice:string):Boolean
  {
    var _flag = false;
    for (let index = 0; index < this.item.length; index++) {
      const element = this.item[index];
       if(element.event.id == bet.id && element.punterBetSelection == punterChoice )
       {
           this.removeFromDoubleClick(bet,punterChoice);
          _flag = true;
          break;
       }
    }
    return _flag;
  }

  updateBetId(){
    for (let index = 0; index < this.item.length; index++) {
      const element = this.item[index];
      element.id = index+1;
    }
  }

  calculateBetPayout(stake:number,odds:number,id:number){
      var calculationOfOdds = stake * odds;
      this.item[id-1].payout = Number(calculationOfOdds);
  }

  calculateCostBasedOnPayout(payout:number,odds:number,id:number)
  {
     var costCalculation = payout / odds ;
     this.item[id-1].stake = Math.round(Number(costCalculation*100))/100;
  }

  clearBetSlip(){
    this.finalTotal =0;
    this.item.splice(0,this.item.length);
  }

  removeFromDoubleClick(event:any,punter:string)
  {
    for (let index = 0; index < this.item.length; index++) {
      const element = this.item[index];
      if(element.event.id ==event.id && element.punterBetSelection == punter)
      {
        this.item.splice(index,1);
      }
    }
    this.updateBetId();
  }

  removeEvent(event:any){
    const index = this.item.indexOf(event);
    if(index!==-1)
    {
      this.item.splice(index,1);
    }
    this.updateBetId();
  }

  checkForRelatedEvents(){
    for (let index = 0; index < this.item.length; index++) {
       const _event = this.item[index];
       this.item[index].relatedGamesMessage =null;
       this.item[index].warning = false; 

       for (let x = 0; x < this.item.length; x++) {
         const _eventIteration = this.item[x];

         if(_event.event.id == _eventIteration.event.id && index!=x)
         {
          this.item[index].warning = true;

           if(this.item[index].relatedGamesMessage==null)
           {
            this.item[index].relatedGamesMessage = `Related to leg ${_eventIteration.id}`;
           }
           else{
            this.item[index].relatedGamesMessage += ` and ${_eventIteration.id}`;
           }
         }
       }
    }
  }

  checkIfMutipleIsAllowed():boolean{
    var _flag= true;
 
    for (let index = 0; index < this.item.length; index++) {
      const element = this.item[index];
      if(element.warning==true)
      {
        _flag = false;
        break;
      }
    }
    return _flag;
  }

  checkForRealtedBetsId()
  {
    this.realtedBetsSlipId = [];
    for (let index = 0; index < this.item.length; index++) {
      const element = this.item[index];
      if(element.warning==true)
      {
        this.realtedBetsSlipId.push(element.id);
      }
    }
  }

  calculateTotalOdds():number{
    var _sumOfOdds = 0;
    var _mutiplicationOfOdds =1;
    for (let index = 0; index < this.item.length; index++) {
      const element = this.item[index];
      _sumOfOdds+= Number(element.selctionOdds);
      _mutiplicationOfOdds += _mutiplicationOfOdds * Number(element.selctionOdds);
    }
    return Math.round(_sumOfOdds + _mutiplicationOfOdds);
  }

  handleError(error: HttpErrorResponse){
    console.log(error.error.status);
      return of(error.error);
    }
    
  

}
