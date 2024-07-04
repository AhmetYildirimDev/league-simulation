import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from '../../interfaces/match.interface';

@Component({
  selector: 'app-match-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.scss']
})
export class MatchResultComponent {
  @Output() resultsUpdated = new EventEmitter<Match[]>();

  matchResults: Match[] = [];
  currentWeek: number = 1;
  totalWeeks: number = 6;

  constructor() {
    this.generateMatches();
  }

  generateMatches() {
    const teams = ['Fenerbahçe', 'Galatasaray', 'Beşiktaş', 'Sivasspor'];
    const schedule = [
      { home: 0, away: 1 }, // Week 1
      { home: 2, away: 3 },
      { home: 0, away: 2 }, // Week 2
      { home: 1, away: 3 },
      { home: 0, away: 3 }, // Week 3
      { home: 1, away: 2 },
      { home: 1, away: 0 }, // Week 4
      { home: 3, away: 2 },
      { home: 2, away: 0 }, // Week 5
      { home: 3, away: 1 },
      { home: 3, away: 0 }, // Week 6
      { home: 2, away: 1 },
    ];

    for (let week = 0; week < this.totalWeeks; week++) {
      for (let matchIndex = 0; matchIndex < 2; matchIndex++) {
        const match = schedule[week * 2 + matchIndex];
        this.matchResults.push({
          homeTeam: teams[match.home],
          homeScore: this.randomScore(),
          awayTeam: teams[match.away],
          awayScore: this.randomScore()
        });
      }
    }
    this.resultsUpdated.emit(this.getCurrentWeekResults());
  }

  randomScore(): number {
    return Math.floor(Math.random() * 5); // Random score between 0 and 4
  }

  nextWeek() {
    if (this.currentWeek < this.totalWeeks) {
      this.currentWeek++;
      this.resultsUpdated.emit(this.getCurrentWeekResults());
    }
  }

  getCurrentWeekResults(): Match[] {
    return this.matchResults.slice((this.currentWeek - 1) * 2, this.currentWeek * 2);
  }
}
