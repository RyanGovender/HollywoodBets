import { betSlip } from './betSlip';

export interface PunterBetSlip{
    payout:number;
    stake:number;
    numberOfLegs:number;
    accountNumber:number;
}

export interface BetSlipViewModel{
    betslips : betSlip[];
    punterBetSlip: PunterBetSlip;
}