"use client";

import { useState, useEffect, useRef } from "react";
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
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set()
  );
  const dotsContainerRef = useRef<HTMLDivElement>(null);

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

  const preloadImage = (src: string) => {
    if (!preloadedImages.has(src)) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setPreloadedImages((prev) => new Set([...prev, src]));
      };
    }
  };

  const preloadAdjacentImages = (index: number) => {
    const prevIndex = index > 0 ? index - 1 : badges.length - 1;
    const nextIndex = index < badges.length - 1 ? index + 1 : 0;

    if (badges[prevIndex]?.strBadge) {
      preloadImage(badges[prevIndex].strBadge);
    }
    if (badges[nextIndex]?.strBadge) {
      preloadImage(badges[nextIndex].strBadge);
    }
  };

  useEffect(() => {
    if (badges.length > 0 && currentBadgeIndex < badges.length) {
      preloadAdjacentImages(currentBadgeIndex);
    }
  }, [currentBadgeIndex, badges]);

  const scrollToActiveDot = (index: number) => {
    if (dotsContainerRef.current) {
      const container = dotsContainerRef.current;
      const dots = container.children;
      const activeDot = dots[index] as HTMLElement;

      if (activeDot) {
        const containerRect = container.getBoundingClientRect();
        const dotRect = activeDot.getBoundingClientRect();
        const scrollLeft =
          dotRect.left -
          containerRect.left -
          containerRect.width / 2 +
          dotRect.width / 2;

        container.scrollTo({
          left: container.scrollLeft + scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrevBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex =
      currentBadgeIndex > 0 ? currentBadgeIndex - 1 : badges.length - 1;
    setCurrentBadgeIndex(newIndex);
    scrollToActiveDot(newIndex);
  };

  const handleNextBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex =
      currentBadgeIndex < badges.length - 1 ? currentBadgeIndex + 1 : 0;
    setCurrentBadgeIndex(newIndex);
    scrollToActiveDot(newIndex);
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentBadgeIndex(index);
    scrollToActiveDot(index);
  };

  const getVisibleDots = () => {
    if (badges.length <= 7) {
      return badges.map((_, index) => index);
    }

    const totalDots = badges.length;
    const maxVisible = 7;
    const sideCount = Math.floor((maxVisible - 1) / 2);

    let start = Math.max(0, currentBadgeIndex - sideCount);
    let end = Math.min(totalDots - 1, currentBadgeIndex + sideCount);

    if (end - start + 1 < maxVisible) {
      if (start === 0) {
        end = Math.min(totalDots - 1, start + maxVisible - 1);
      } else {
        start = Math.max(0, end - maxVisible + 1);
      }
    }

    const visibleIndices = [];
    for (let i = start; i <= end; i++) {
      visibleIndices.push(i);
    }

    return visibleIndices;
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

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm mb-4 p-3 rounded-lg border border-slate-600/20 league-alternative-bg">
            <span className="text-slate-500">Alternative:</span>
            <span className="text-slate-300 font-medium">
              {league.strLeagueAlternate || "Brak informacji o alternatywach"}
            </span>
          </div>

          {showBadges && (
            <div className="mt-4 pt-4 border-t border-slate-600/30">
              {isLoading && (
                <div className="flex items-center justify-center py-8 space-x-3">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                  <span className="text-sm text-slate-400">
                    Ładowanie odznak...
                  </span>
                </div>
              )}

              {error && (
                <div className="text-center py-6">
                  <p className="text-sm text-red-400">
                    Nie udało się załadować odznak sezonowych
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
                          Sezon: {currentBadge?.strSeason}
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
                          title="Poprzedni sezon"
                        >
                          <ChevronLeft className="h-4 w-4 text-slate-400 hover:text-blue-400 transition-colors duration-200" />
                        </button>
                        <button
                          onClick={handleNextBadge}
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-110 border border-slate-600/30 hover:border-blue-500/50 league-button-bg"
                          title="Następny sezon"
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
                          alt={`Odznaka sezonu ${currentBadge.strSeason} - ${league.strLeague}`}
                          className="max-w-full h-auto max-h-32 mx-auto rounded-lg"
                          fallback={
                            <div className="text-center py-4">
                              <p className="text-sm text-red-400">
                                Nie udało się załadować odznaki
                              </p>
                            </div>
                          }
                        />
                        <div className="absolute inset-0 rounded-lg blur-xl opacity-50 -z-10 league-badge-blur" />
                      </div>
                    )}
                  </div>

                  {badges.length > 1 && (
                    <div className="relative">
                      {badges.length > 7 && (
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">
                            {badges.length > 7
                              ? `${currentBadgeIndex + 1} z ${badges.length}`
                              : ""}
                          </span>
                        </div>
                      )}

                      <div
                        ref={dotsContainerRef}
                        className="flex justify-center space-x-2 overflow-x-auto scrollbar-hide pb-2"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {badges.length <= 7 ? (
                          badges.map((badge, index) => (
                            <button
                              key={index}
                              onClick={(e) => handleDotClick(index, e)}
                              className={`w-2 h-2 rounded-full transition-all duration-200 border flex-shrink-0 ${
                                index === currentBadgeIndex
                                  ? "scale-125 border-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.5)] league-dot-active"
                                  : "border-slate-600/30 hover:scale-125 hover:border-blue-500/50 league-dot-inactive"
                              }`}
                              title={`Sezon ${badge.strSeason}`}
                            />
                          ))
                        ) : (
                          <>
                            {currentBadgeIndex > 3 && (
                              <>
                                <button
                                  onClick={(e) => handleDotClick(0, e)}
                                  className="w-2 h-2 rounded-full transition-all duration-200 border border-slate-600/30 hover:scale-125 hover:border-blue-500/50 league-dot-inactive flex-shrink-0"
                                  title={`Sezon ${badges[0].strSeason}`}
                                />
                                <span className="text-slate-500 text-xs">
                                  ...
                                </span>
                              </>
                            )}

                            {getVisibleDots().map((index) => (
                              <button
                                key={index}
                                onClick={(e) => handleDotClick(index, e)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 border flex-shrink-0 ${
                                  index === currentBadgeIndex
                                    ? "scale-125 border-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.5)] league-dot-active"
                                    : "border-slate-600/30 hover:scale-125 hover:border-blue-500/50 league-dot-inactive"
                                }`}
                                title={`Sezon ${badges[index].strSeason}`}
                              />
                            ))}

                            {currentBadgeIndex < badges.length - 4 && (
                              <>
                                <span className="text-slate-500 text-xs">
                                  ...
                                </span>
                                <button
                                  onClick={(e) =>
                                    handleDotClick(badges.length - 1, e)
                                  }
                                  className="w-2 h-2 rounded-full transition-all duration-200 border border-slate-600/30 hover:scale-125 hover:border-blue-500/50 league-dot-inactive flex-shrink-0"
                                  title={`Sezon ${
                                    badges[badges.length - 1].strSeason
                                  }`}
                                />
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {badges.length === 0 && !isLoading && !error && (
                <div className="text-center py-8 space-y-3">
                  <Sparkles className="h-8 w-8 text-gray-500 mx-auto opacity-50" />
                  <p className="text-sm text-slate-500">
                    Brak dostępnych odznak sezonowych
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

