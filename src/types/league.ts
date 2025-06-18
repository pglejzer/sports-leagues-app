export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

export interface LeagueResponse {
  leagues: League[];
}

export interface SeasonBadge {
  strSeason: string;
  strBadge: string | null;
}

export interface SeasonBadgeResponse {
  seasons: SeasonBadge[];
}

