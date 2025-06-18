import { useQuery } from "@tanstack/react-query";
import { leagueApi } from "@/lib/api";
import { League } from "@/types/league";

export const useLeagues = () => {
  return useQuery({
    queryKey: ["leagues"],
    queryFn: async () => {
      const response = await leagueApi.getAllLeagues();
      return response.leagues || [];
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

export const useFilteredLeagues = (
  leagues: League[],
  searchTerm: string,
  selectedSport: string
) => {
  return leagues.filter((league) => {
    const matchesSearch = league.strLeague
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "" || league.strSport === selectedSport;
    return matchesSearch && matchesSport;
  });
};

