import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../app/Components/dashboard/dashboard.component';
import {TodaysSoccerComponent} from  '../app/Components/todays-soccer/todays-soccer.component';
import {BetslipComponent} from '../app/Components/betslip/betslip.component'
import { from } from 'rxjs';

const routes:Routes =[
  {path: 'dashboard', component:DashboardComponent},
  {path: 'todays-soccer', component:TodaysSoccerComponent},
  {path: 'betslip', component:BetslipComponent},
  {path:'', redirectTo: '/todays-soccer', pathMatch: 'full'}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
