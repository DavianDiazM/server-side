import { Request, Response } from "express";

export async function getGameById(req: Request, res: Response) {
  const { gameId } = req.params;
  try {
    const response = await fetch(
      `https://lichess.org/api/game/${gameId}?pgnInJson=true`
    );
    if (!response.ok) {
      throw new Error(`Error fetching game: ${response.statusText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getGameByUser(req: Request, res: Response) {
  const { username } = req.params;
  try {
    const response = await fetch(
      `https://lichess.org/api/games/user/${username}?pgnInJson=true&max=50`,
      {
        headers: {
          Accept: "application/x-ndjson",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching user games: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let { value, done } = await reader.read();
    let buffer = "";

    const games = [];

    while (!done) {
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim()) {
          try {
            const game = JSON.parse(line);
            games.push(game);
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }
      }

      ({ value, done } = await reader.read());
    }

    if (buffer.trim()) {
      try {
        const game = JSON.parse(buffer);
        games.push(game);
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    }

    res.json(games);
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
