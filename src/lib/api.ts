import axios from "axios";
import { LeagueResponse, SeasonBadgeResponse } from "@/types/league";

const api = axios.create({
  baseURL: "https://www.thesportsdb.com/api/v1/json/3",
});

export const leagueApi = {
  getAllLeagues: async (): Promise<LeagueResponse> => {
    const response = await api.get<LeagueResponse>("/all_leagues.php");
    return response.data;
  },

  getSeasonBadge: async (leagueId: string): Promise<SeasonBadgeResponse> => {
    const response = await api.get<SeasonBadgeResponse>(
      `/search_all_seasons.php?badge=1&id=${leagueId}`
    );
    return response.data;
  },
};

export default api;

