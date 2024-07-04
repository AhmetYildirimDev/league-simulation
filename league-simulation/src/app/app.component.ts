import { Component } from '@angular/core';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { MatchResultComponent } from './components/match-result/match-result.component';
import { CommonModule } from '@angular/common';
import { ChampionshipOddsComponent } from './components/championship-odds/championship-odds.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LeagueTableComponent, MatchResultComponent, ChampionshipOddsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
