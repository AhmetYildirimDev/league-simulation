import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Team {
  name: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDifference: number;
}

@Component({
  imports: [CommonModule],
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss'],
  standalone: true,
})
export class LeagueTableComponent {
  @Input() teams: Team[] = [];
}
