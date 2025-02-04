"use client";

import GameService from "@/services/game";
import { TGame } from "@/types/game";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

export default function useFetchGames(
  setter: Dispatch<SetStateAction<TGame[]>>,
) {
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await GameService.getGames();
      if (response.success) setter(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [setter]);

  return { isLoading, fetchGames };
}
