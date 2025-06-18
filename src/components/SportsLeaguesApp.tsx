"use client";

import { useState, useMemo } from "react";
import { useLeagues, useFilteredLeagues } from "@/hooks/useLeagues";
import { SearchBar } from "./SearchBar/SearchBar";
import { SportFilter } from "./SportFilter/SportFilter";
import { LeagueList } from "./LeagueList/LeagueList";
import { Trophy, Globe, ChevronDown, Filter, X } from "lucide-react";

const ITEMS_PER_PAGE = 12;

export const SportsLeaguesApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const { data: leagues = [], isLoading, error } = useLeagues();

  const availableSports = useMemo(() => {
    const sports = leagues.map((league) => league.strSport);
    return Array.from(new Set(sports)).sort();
  }, [leagues]);

  const filteredLeagues = useFilteredLeagues(
    leagues,
    searchTerm,
    selectedSport
  );

  const displayedLeagues = filteredLeagues.slice(0, displayCount);
  const hasMore = displayCount < filteredLeagues.length;

  const loadMore = () => {
    setDisplayCount((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, filteredLeagues.length)
    );
  };

  useMemo(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchTerm, selectedSport]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSport("");
  };

  const hasActiveFilters = searchTerm !== "" || selectedSport !== "";

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="responsive-container">
        <header className="py-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <Trophy className="h-12 w-12 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sports Leagues Explorer
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover and explore sports leagues from around the world
          </p>
        </header>

        <div className="mb-8">
          <div className="card-base p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-6">
              <div className="flex-1 w-full">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search sports leagues..."
                />
              </div>
              <div className="w-full md:w-auto md:min-w-[250px]">
                <SportFilter
                  sports={availableSports}
                  selectedSport={selectedSport}
                  onChange={setSelectedSport}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-700/50">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center text-slate-400">
                  <Globe className="h-4 w-4 mr-2 text-blue-400" />
                  Found:{" "}
                  <span className="text-white font-semibold ml-1">
                    {filteredLeagues.length}
                  </span>
                  {"  "} leagues
                </span>

                {displayedLeagues.length < filteredLeagues.length && (
                  <span className="flex items-center text-blue-400">
                    <Filter className="h-4 w-4 mr-1" />
                    Showing {displayedLeagues.length} of{" "}
                    {filteredLeagues.length}
                  </span>
                )}

                {selectedSport && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    Sport: {selectedSport}
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-600/50 hover:text-white transition-all duration-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        <LeagueList
          leagues={displayedLeagues}
          isLoading={isLoading}
          error={error}
        />

        {hasMore && !isLoading && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="inline-flex items-center px-8 py-4 rounded-xl text-base font-medium bg-slate-800/50 text-white border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <ChevronDown className="h-5 w-5 mr-2" />
              Load More Leagues
            </button>
          </div>
        )}

        <footer className="mt-20 py-12 text-center border-t border-slate-800">
          <p className="text-slate-500 mb-2">
            Data provided by{" "}
            <a
              href="https://www.thesportsdb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-blue-500/30"
            >
              TheSportsDB API
            </a>
          </p>
          <p className="text-slate-600 text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};

