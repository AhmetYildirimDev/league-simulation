import { Component } from '@angular/core';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { MatchResultComponent } from './components/match-result/match-result.component';
import { CommonModule } from '@angular/common';
import { Match } from './interfaces/match.interface';
import { Team } from './interfaces/team.interface'; // Team arayüzünü ekleyin

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LeagueTableComponent, MatchResultComponent],
  template: `
    <div>
      <h1>Lig Simülasyonu</h1>
      <app-league-table [teams]="teams"></app-league-table>
      <app-match-result (resultsUpdated)="updateTeams($event)"></app-match-result>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  teams: Team[] = [
    { name: 'Fenerbahçe', points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalDifference: 0 },
    { name: 'Galatasaray', points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalDifference: 0 },
    { name: 'Beşiktaş', points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalDifference: 0 },
    { name: 'Sivasspor', points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalDifference: 0 }
  ];

  currentWeek: number = 1;
  totalWeeks: number = 6;
  matchResults: Match[] = [];

  updateTeams(matches: Match[]) {
    // Puanları ve istatistikleri sıfırla
    this.teams.forEach(team => {
      team.played = 0;
      team.won = 0;
      team.drawn = 0;
      team.lost = 0;
      team.goalDifference = 0;
      team.points = 0;
    });

    // Maç sonuçlarını işleyin
    matches.forEach(match => {
      const homeTeam = this.teams.find(team => team.name === match.homeTeam);
      const awayTeam = this.teams.find(team => team.name === match.awayTeam);

      if (homeTeam && awayTeam) {
        homeTeam.played++;
        awayTeam.played++;

        if (match.homeScore > match.awayScore) {
          homeTeam.won++;
          awayTeam.lost++;
          homeTeam.points += 3;
        } else if (match.homeScore < match.awayScore) {
          awayTeam.won++;
          homeTeam.lost++;
          awayTeam.points += 3;
        } else {
          homeTeam.drawn++;
          awayTeam.drawn++;
          homeTeam.points += 1;
          awayTeam.points += 1;
        }

        homeTeam.goalDifference += match.homeScore - match.awayScore;
        awayTeam.goalDifference += match.awayScore - match.homeScore;
      }
    });
  }
}
