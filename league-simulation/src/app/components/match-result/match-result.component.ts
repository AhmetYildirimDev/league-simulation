import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from '../../interfaces/match.interface';
import { MatchService } from '../../services/match.service';

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
  seasonStarted: boolean = false;
  fixtures: Match[][] = [];

  constructor(private matchService: MatchService) {}

  startSeason() {
    this.seasonStarted = true;
    this.generateFixtures();
    this.playWeek();
  }

  generateFixtures() {
    const teams = ['Fenerbahçe', 'Galatasaray', 'Beşiktaş', 'Sivasspor'];
    const fixtures: Match[][] = [];

    for (let week = 0; week < this.totalWeeks; week++) {
      const weekFixtures: Match[] = [];
      if (week % 2 === 0) {
        weekFixtures.push({ homeTeam: teams[0], homeScore: 0, awayTeam: teams[1], awayScore: 0 });
        weekFixtures.push({ homeTeam: teams[2], homeScore: 0, awayTeam: teams[3], awayScore: 0 });
      } else {
        weekFixtures.push({ homeTeam: teams[0], homeScore: 0, awayTeam: teams[2], awayScore: 0 });
        weekFixtures.push({ homeTeam: teams[1], homeScore: 0, awayTeam: teams[3], awayScore: 0 });
      }
      fixtures.push(weekFixtures);
    }
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
