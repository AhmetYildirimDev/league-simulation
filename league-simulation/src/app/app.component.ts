import { Component } from '@angular/core';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { MatchResultComponent } from './components/match-result/match-result.component';
import { CommonModule } from '@angular/common';
import { Match } from './interfaces/match.interface';
import { Team } from './interfaces/team.interface'; // Team arayüzünü ekleyin
import { ChampionshipOddsComponent } from './components/championship-odds/championship-odds.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LeagueTableComponent, MatchResultComponent, ChampionshipOddsComponent],
  template: `
    <div>
      <h1>Lig Simülasyonu</h1>
      <app-league-table [teams]="teams"></app-league-table>
      <app-match-result (resultsUpdated)="updateTeams($event)"></app-match-result>
      <app-championship-odds [teams]="teams"></app-championship-odds>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  teams: Team[] = [
    { name: 'Fenerbahçe', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: 'Galatasaray', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: 'Sivasspor', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: 'Beşiktaş', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
  ];

  currentWeek: number = 1;
  totalWeeks: number = 6;
  matchResults: Match[] = [
    // 1. Hafta
    { homeTeam: 'Fenerbahçe', awayTeam: 'Galatasaray', homeScore: 0, awayScore: 0 },
    { homeTeam: 'Sivasspor', awayTeam: 'Beşiktaş', homeScore: 0, awayScore: 0 },
    // 2. Hafta
    { homeTeam: 'Fenerbahçe', awayTeam: 'Beşiktaş', homeScore: 0, awayScore: 0 },
    { homeTeam: 'Galatasaray', awayTeam: 'Sivasspor', homeScore: 0, awayScore: 0 },
    // 3. Hafta
    { homeTeam: 'Fenerbahçe', awayTeam: 'Sivasspor', homeScore: 0, awayScore: 0 },
    { homeTeam: 'Galatasaray', awayTeam: 'Beşiktaş', homeScore: 0, awayScore: 0 },
    // 4. Hafta (Deplasman-Ev sahibi değişikliği)
    { homeTeam: 'Galatasaray', awayTeam: 'Fenerbahçe', homeScore: 0, awayScore: 0 },
    { homeTeam: 'Beşiktaş', awayTeam: 'Sivasspor', homeScore: 0, awayScore: 0 },
    // 5. Hafta
    { homeTeam: 'Beşiktaş', awayTeam: 'Fenerbahçe', homeScore: 0, awayScore: 0 },
    { homeTeam: 'Sivasspor', awayTeam: 'Galatasaray', homeScore: 0, awayScore: 0 },
    // 6. Hafta
    { homeTeam: 'Sivasspor', awayTeam: 'Fenerbahçe', homeScore: 0, awayScore: 0 },
    { homeTeam: 'Beşiktaş', awayTeam: 'Galatasaray', homeScore: 0, awayScore: 0 }
  ];

  updateTeams(matches: Match[]) {
    // Puanları ve istatistikleri sıfırla
    this.teams.forEach(team => {
      team.played = 0;
      team.won = 0;
      team.drawn = 0;
      team.lost = 0;
      team.goalsFor = 0;
      team.goalsAgainst = 0;
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

        homeTeam.goalsFor += match.homeScore;
        homeTeam.goalsAgainst += match.awayScore;
        awayTeam.goalsFor += match.awayScore;
        awayTeam.goalsAgainst += match.homeScore;

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

        if (homeTeam.goalDifference !== undefined && awayTeam.goalDifference !== undefined) {
          homeTeam.goalDifference += match.homeScore - match.awayScore;
          awayTeam.goalDifference += match.awayScore - match.homeScore;
        }
      }
    });

    // Haftalık maç sonuçlarını güncelle
    this.matchResults = matches;
  }
}
