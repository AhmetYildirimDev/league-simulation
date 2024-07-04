import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from '../../interfaces/match.interface';
import { MatchService } from '../../services/match.service';
import { Team } from '../../interfaces/team.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-league-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss']
})
export class LeagueTableComponent implements OnInit, OnDestroy {
  @Input() teams: Team[] = [
    { name: 'Fenerbahçe', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { name: 'Galatasaray', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { name: 'Beşiktaş', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { name: 'Sivasspor', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
  ];
  matchResults: Match[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private matchService: MatchService) {}

  ngOnInit() {
    this.subscription = this.matchService.matchResults$.subscribe(
      results => {
        this.matchResults = results;
        this.updateTeams();
      }
    );
  }

  updateTeams() {
    this.teams.forEach(team => {
      team.played = 0;
      team.won = 0;
      team.drawn = 0;
      team.lost = 0;
      team.goalsFor = 0;
      team.goalsAgainst = 0;
      team.points = 0;
    });

    this.matchResults.forEach(match => {
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
          homeTeam.points++;
          awayTeam.points++;
        }
      }
    });

    this.teams.sort((a, b) => b.points - a.points || b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst) || a.name.localeCompare(b.name));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
