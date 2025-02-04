export type TGame = {
  id: number;
  fixture_id: number;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  halftime_home_score: number;
  halftime_away_score: number;
  game_date: string; // ISO 8601 date string
  venue_name: string;
  venue_city: string;
  league_name: string;
  league_season: number;
  status: string;
};
