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
    TournamentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
