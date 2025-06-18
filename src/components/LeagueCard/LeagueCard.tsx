"use client";

import { useState } from "react";
import { League } from "@/types/league";
import { useSeasonBadge } from "@/hooks/useSeasonBadge";
import {
  ChevronRight,
  Trophy,
  Loader2,
  ChevronLeft,
  Calendar,
  Sparkles,
} from "lucide-react";
import { LazyImage } from "../LazyImage/LazyImage";

interface LeagueCardProps {
  league: League;
}

export const LeagueCard = ({ league }: LeagueCardProps) => {
  const [showBadges, setShowBadges] = useState(false);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  const {
    data: badges = [],
    isLoading,
    error,
  } = useSeasonBadge(league.idLeague, showBadges);

  const handleCardClick = () => {
    setShowBadges(!showBadges);
    if (!showBadges) {
      setCurrentBadgeIndex(0);
    }
  };

  const handlePrevBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentBadgeIndex((prev) => (prev > 0 ? prev - 1 : badges.length - 1));
  };

  const handleNextBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentBadgeIndex((prev) => (prev < badges.length - 1 ? prev + 1 : 0));
  };

  const currentBadge = badges[currentBadgeIndex];

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform-gpu hover:scale-[1.02] hover:shadow-2xl border border-slate-600/30 hover:border-blue-500/50 group league-card-glassmorphism"
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl league-card-hover-overlay" />

        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative p-3 rounded-xl transition-all duration-300 group-hover:scale-110 border border-blue-500/30 group-hover:border-blue-500/50 league-icon-gradient">
                <Trophy className="h-5 w-5 text-blue-400" />
                <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 league-icon-blur" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-1 transition-colors duration-300 group-hover:text-blue-300">
                  {league.strLeague}
                </h3>
                <p className="text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {league.strSport}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ChevronRight
                className={`h-5 w-5 text-slate-400 transition-all duration-300 ${
                  showBadges ? "rotate-90 text-blue-400" : ""
                }`}
              />
            </div>
          </div>

          {league.strLeagueAlternate && (
            <div className="flex items-center space-x-2 text-sm mb-4 p-3 rounded-lg border border-slate-600/20 league-alternative-bg">
              <span className="text-slate-500">Alternative:</span>
              <span className="text-slate-300 font-medium">
                {league.strLeagueAlternate}
              </span>
            </div>
          )}

          {showBadges && (
            <div className="mt-4 pt-4 border-t border-slate-600/30">
              {isLoading && (
                <div className="flex items-center justify-center py-8 space-x-3">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                  <span className="text-sm text-slate-400">
                    Loading badges...
                  </span>
                </div>
              )}

              {error && (
                <div className="text-center py-6">
                  <p className="text-sm text-red-400">
                    Failed to load season badges
                  </p>
                </div>
              )}

              {badges.length > 0 && !isLoading && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center justify-between sm:justify-start sm:space-x-2 text-sm">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        <span className="text-slate-300">
                          Season: {currentBadge?.strSeason}
                        </span>
                      </div>
                      <span className="text-slate-500">
                        ({currentBadgeIndex + 1}/{badges.length})
                      </span>
                    </div>

                    {badges.length > 1 && (
                      <div className="flex items-center justify-center sm:justify-end space-x-1">
                        <button
                          onClick={handlePrevBadge}
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-110 border border-slate-600/30 hover:border-blue-500/50 league-button-bg"
                          title="Previous season"
                        >
                          <ChevronLeft className="h-4 w-4 text-slate-400 hover:text-blue-400 transition-colors duration-200" />
                        </button>
                        <button
                          onClick={handleNextBadge}
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-110 border border-slate-600/30 hover:border-blue-500/50 league-button-bg"
                          title="Next season"
                        >
                          <ChevronRight className="h-4 w-4 text-slate-400 hover:text-blue-400 transition-colors duration-200" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-center min-h-[120px] flex items-center justify-center">
                    {currentBadge && currentBadge.strBadge && (
                      <div className="relative">
                        <LazyImage
                          width={100}
                          height={100}
                          src={currentBadge.strBadge}
                          alt={`Season ${currentBadge.strSeason} badge - ${league.strLeague}`}
                          className="max-w-full h-auto max-h-32 mx-auto rounded-lg"
                          fallback={
                            <div className="text-center py-4">
                              <p className="text-sm text-red-400">
                                Failed to load badge
                              </p>
                            </div>
                          }
                        />
                        <div className="absolute inset-0 rounded-lg blur-xl opacity-50 -z-10 league-badge-blur" />
                      </div>
                    )}
                  </div>

                  {badges.length > 1 && (
                    <div className="flex justify-center space-x-2">
                      {badges.map((badge, index) => (
                        <button
                          key={badge.strSeason}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentBadgeIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-200 border ${
                            index === currentBadgeIndex
                              ? "scale-125 border-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.5)] league-dot-active"
                              : "border-slate-600/30 hover:scale-125 hover:border-blue-500/50 league-dot-inactive"
                          }`}
                          title={`Season ${badges[index].strSeason}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {badges.length === 0 && !isLoading && !error && (
                <div className="text-center py-8 space-y-3">
                  <Sparkles className="h-8 w-8 text-gray-500 mx-auto opacity-50" />
                  <p className="text-sm text-slate-500">
                    No season badges available
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

