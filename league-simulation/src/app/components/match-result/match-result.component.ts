import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from '../../interfaces/match.interface';
import { MatchService } from '../../services/match.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-match-result',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.scss']
})
export class MatchResultComponent {
  matchResults: Match[] = [];
  currentWeek: number = 1;
  totalWeeks: number = 6;
  seasonStarted: boolean = false;
  fixtures: Match[][] = [];

  constructor(private matchService: MatchService) {}

  startSeason() {
    this.seasonStarted = true;
    this.generateFixtures();
    this.playWeek();
  }

  generateFixtures() {
    const fixtures: Match[][] = [];

    fixtures.push(
      [
        { homeTeam: 'Fenerbahçe', awayTeam: 'Galatasaray', homeScore: 0, awayScore: 0 },
        { homeTeam: 'Beşiktaş', awayTeam: 'Sivasspor', homeScore: 0, awayScore: 0 }
      ],
      [
        { homeTeam: 'Fenerbahçe', awayTeam: 'Beşiktaş', homeScore: 0, awayScore: 0 },
        { homeTeam: 'Galatasaray', awayTeam: 'Sivasspor', homeScore: 0, awayScore: 0 }
      ],
      [
        { homeTeam: 'Fenerbahçe', awayTeam: 'Sivasspor', homeScore: 0, awayScore: 0 },
        { homeTeam: 'Galatasaray', awayTeam: 'Beşiktaş', homeScore: 0, awayScore: 0 }
      ],
      [
        { homeTeam: 'Galatasaray', awayTeam: 'Fenerbahçe', homeScore: 0, awayScore: 0 },
        { homeTeam: 'Sivasspor', awayTeam: 'Beşiktaş', homeScore: 0, awayScore: 0 }
      ],
      [
        { homeTeam: 'Beşiktaş', awayTeam: 'Fenerbahçe', homeScore: 0, awayScore: 0 },
        { homeTeam: 'Sivasspor', awayTeam: 'Galatasaray', homeScore: 0, awayScore: 0 }
      ],
      [
        { homeTeam: 'Sivasspor', awayTeam: 'Fenerbahçe', homeScore: 0, awayScore: 0 },
        { homeTeam: 'Beşiktaş', awayTeam: 'Galatasaray', homeScore: 0, awayScore: 0 }
      ]
    );

    this.fixtures = fixtures;
  }

  playWeek() {
    const weekFixtures = this.fixtures[this.currentWeek - 1];
    weekFixtures.forEach(match => {
      match.homeScore = this.randomScore();
      match.awayScore = this.randomScore();
      this.matchResults.push(match);
    });
    this.matchService.updateMatchResults(this.matchResults);
  }

  randomScore(): number {
    return Math.floor(Math.random() * 5); // Random score between 0 and 4
  }

  nextWeek() {
    if (this.currentWeek < this.totalWeeks) {
      this.currentWeek++;
      this.playWeek();
    }
  }
}
