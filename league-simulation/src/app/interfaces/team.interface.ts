export interface Team {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number; // Eklenen özellik
  goalsAgainst: number; // Eklenen özellik
  goalDifference?: number; // Eklenen özellik
  points: number;
}
