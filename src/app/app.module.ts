import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar/navbar.component';
import { SidenavComponent } from './Components/sidenav/sidenav/sidenav.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BetslipComponent } from './Components/betslip/betslip.component';
import { FooterComponent } from './Components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TodaysSoccerComponent } from './Components/todays-soccer/todays-soccer.component';
import { AppRoutingModule } from './app-routing.module';
import { CountryComponent } from './Components/country/country.component';
import { TournamentComponent } from './Components/tournament/tournament.component';
import { EventComponent } from './Components/event/event.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './Store/reducers/sportsTree.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SportTreeEffects } from './Store/effects/sportTree.effects';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    DashboardComponent,
    BetslipComponent,
    FooterComponent,
    TodaysSoccerComponent,
    CountryComponent,
    TournamentComponent,
    EventComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      sportsTree:reducer
    }),
    EffectsModule.forRoot([SportTreeEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
