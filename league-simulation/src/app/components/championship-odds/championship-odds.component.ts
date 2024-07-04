import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../interfaces/team.interface';
import { Subscription } from 'rxjs';
import { MatchService } from '../../services/match.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MatchStore } from '../../services/match-store';

@Component({
  selector: 'app-championship-odds',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './championship-odds.component.html',
  styleUrls: ['./championship-odds.component.scss']
})
export class ChampionshipOddsComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  championshipOdds: { team: string, odds: number }[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private matchService: MatchService, private matchStore: MatchStore) {}

  ngOnInit() {
    this.matchStore.getTeam().subscribe(teams => {
      this.teams = teams;
    });
    this.subscription = this.matchService.matchResults$.subscribe(
      () => {
        this.calculateOdds();
      }
    );
  }

  calculateOdds() {
    const totalPoints = this.teams.reduce((sum, team) => sum + team.points, 0);
    this.championshipOdds = this.teams.map(team => ({
      team: team.name,
      odds: totalPoints ? (team.points / totalPoints) * 100 : 0
    }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
