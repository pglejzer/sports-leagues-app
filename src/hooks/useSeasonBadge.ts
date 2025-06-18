import { useQuery } from "@tanstack/react-query";
import { leagueApi } from "@/lib/api";
import { SeasonBadge } from "@/types/league";

export const useSeasonBadge = (leagueId: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ["season-badge", leagueId],
    queryFn: async () => {
      const response = await leagueApi.getSeasonBadge(leagueId);
      if (!response.seasons) return [];

      const validBadges = response.seasons
        .filter((season: SeasonBadge) => season.strBadge !== null)
        .sort(
          (a: SeasonBadge, b: SeasonBadge) =>
            parseInt(b.strSeason) - parseInt(a.strSeason)
        );

      return validBadges;
    },
    enabled,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

