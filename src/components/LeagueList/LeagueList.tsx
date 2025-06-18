import { League } from "@/types/league";
import { LeagueCard } from "../LeagueCard/LeagueCard";
import { Loader2, AlertCircle, Search } from "lucide-react";

interface LeagueListProps {
  leagues: League[];
  isLoading: boolean;
  error: Error | null;
}

export const LeagueList = ({ leagues, isLoading, error }: LeagueListProps) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <Loader2 className="loading-spinner" />
          <span className="loading-text">Loading sports leagues...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <AlertCircle className="error-icon" />
          <div className="space-y-1">
            <h3 className="error-title">Error loading data</h3>
            <p className="error-message">Failed to fetch sports leagues</p>
          </div>
        </div>
      </div>
    );
  }

  if (leagues.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-content">
          <Search className="empty-icon" />
          <h3 className="empty-title">No leagues found</h3>
          <p className="empty-message">
            Try adjusting your search criteria or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="leagues-grid">
      {leagues.map((league) => (
        <LeagueCard key={league.idLeague} league={league} />
      ))}
    </div>
  );
};

