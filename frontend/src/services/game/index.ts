import { TGame } from "@/types/game";
import { get, post, TApiResponse } from "../serviceConfig";
import Services from "../serviceUrls";

interface TUpdateScoreRequest {
  fixture_id: string;
  home_score: number;
  away_score: number;
}

async function getGames(): Promise<TApiResponse<TGame[]>> {
  return get(Services.getGames, { withCredentials: false });
}

async function updateScore(
  data: TUpdateScoreRequest,
): Promise<TApiResponse<null>> {
  return post(Services.updateScore, data);
}

const GameService = {
  getGames: getGames,
  updateScore: updateScore,
};

export default GameService;
