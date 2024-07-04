import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Team } from "../interfaces/team.interface";

@Injectable({
  providedIn: 'root'
})
export class MatchStore {
  private teamStore: BehaviorSubject<Team[]>;

  constructor() {
    this.teamStore = new BehaviorSubject<Team[]>([
      { name: 'Fenerbahçe', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: 'Galatasaray', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: 'Sivasspor', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: 'Beşiktaş', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
    ]);
  }

  getTeam(): Observable<Team[]> {
    return this.teamStore.asObservable();
  }

  updateTeam(newState: Team[]): void {
    this.teamStore.next(newState);
  }

}