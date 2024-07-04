import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Match } from '../interfaces/match.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchResultsSubject = new BehaviorSubject<Match[]>([]);
  matchResults$ = this.matchResultsSubject.asObservable();

  updateMatchResults(results: Match[]) {
    this.matchResultsSubject.next(results);
  }
}
