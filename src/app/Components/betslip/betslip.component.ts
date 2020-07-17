import { Component, OnInit } from '@angular/core';
import { BetslipService } from 'src/app/Services/betslip.service';
import { betSlip } from 'src/app/Models/betSlip';
import { BounusService } from 'src/app/Services/bounus.service';
import { Bounus } from 'src/app/Models/Bounus';
import { PunterBetSlip } from 'src/app/Models/BetSlipViewModel';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {


 
  constructor(private betslipService:BetslipService,private bounusService:BounusService) { }

  item =[];
  count =0;
  message:string;
  relatedBets=[];
  bonusArray:Bounus[];

  numberOfLegsMessage:string;
  odds:number;
  bonus:number;
  finalOdds:number;
  finalPrice:number;
  bonusId:number;
  multipleStake=0;
  multiplePayout=0;
  successfullyBet = false;
  unsuccessfulBet = false;
  minStake=false;
  betConfirmationMessage:String;

  ngOnInit(): void { 
    this.getAllBonus();
  }

  ngAfterContentChecked(){
    this.item =this.betslipService.item;
    this.count = this.item.length;
    this.betslipService.checkForRelatedEvents();
    this.count>0?this.displayRelatedBetIds():null;
    this.odds = this.betslipService.calculateTotalOdds();
    this.count>0?this.getBetSlipBonus():null;
    this.calculateFinalOdds();
    
  }

 remove(item:any){
   this.betslipService.removeEvent(item);
 }

 getColor(warning:boolean){
   return warning ? 'warning' : 'dark';
 }

 getRowColour(id:number){
    return id==this.bonusId ? 'primary' : '';
 }

 closeSuccessfulMessage()
 {
    this.successfullyBet = false;
 }
 closeUnsuccessfulMessage()
 {
    this.unsuccessfulBet = false;
 }

 submitBet(value:number)
 {
   if(value>0)
   {
     this.betslipService.PostToDb(this.setPunterBetSlip(value)).subscribe((value:any)=>{
     this.betConfirmationMessage = value.status;
     this.setBetStatus(value);
    });
   }
   else{
     this.minStake = true;
   }
 }

 setPunterBetSlip(value)
 {
  const betSlip : PunterBetSlip ={
    payout : this.multiplePayout,
    stake:Number(value),
    numberOfLegs:this.count,
    accountNumber:1
  }
  return betSlip;
 }

 setBetStatus(value)
 {
  if(value.status.startsWith('B'))
  {
    this.successfullyBet = true;
    this.clearBetSlip();
  }
  else
  {
    this.unsuccessfulBet = true;
  }
 }

 clearBetSlip()
 {
   this.minStake = false;
   this.multipleStake =0;
   this.multiplePayout =0;
   this.betslipService.clearBetSlip();
 }

  onKey(stake: number,odds:number,id:number) {
       this.betslipService.calculateBetPayout(stake,odds,id);
  }

  calculateCostBaseOnPayout(payout:number,odds,id:number)
  {
      this.minStake = false;
      this.betslipService.calculateCostBasedOnPayout(payout,odds,id);
  }

  calculateMutiplePayoutBaseOnStake(punterMultipleStake:number)
  {
     this.multiplePayout = this.betslipService.calculateMutiplePayout(punterMultipleStake,this.finalOdds);
  }

  calculateStakeBaseonPayout(punterRequiredPayout:number)
  {
    this.multipleStake = this.betslipService.calculateMultipleStake(punterRequiredPayout,this.finalOdds);
  }

  checkIfMutipleAllowed():boolean{
      return this.betslipService.checkIfMutipleIsAllowed();
  }

  displayRelatedBetIds()
  {
    this.betslipService.checkForRealtedBetsId();
    this.relatedBets=[];
    this.relatedBets = this.betslipService.realtedBetsSlipId;
    var message =" ";
    this.relatedBets.forEach(element => {
        message +=`${element},`;
    });
    this.message = `[${message.substring(message.length-1,1)}]`;
  }

  getAllBonus(){
       return this.bounusService.getAllBounus().subscribe((res:any)=>
       {
         this.bonusArray = res;
       });
  }

  getBetSlipBonus(){
    for (let bonus = 0; bonus < this.bonusArray.length; bonus++) {
      const element = this.bonusArray[bonus];
      if(element.numberOfLegs == this.count)
      {
        this.bonus = element.bounusPercentage
        this.bonusId = element.id;
       if(this.bonusArray.length-1 != bonus) this.numberOfLegsMessage =`Bet ${this.bonusArray[bonus+1].numberOfLegs} legs for a ${this.bonusArray[bonus+1].bounusPercentage}% bonus.`;
        break;
      }
    }
  }

  calculateFinalOdds()
  {
    this.finalOdds = this.odds + (this.odds * this.bonus/100);
  }

  
}
