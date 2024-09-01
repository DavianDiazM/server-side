import { Request, Response } from "express";

export async function getTournamentsCurrent(req: Request, res: Response) {
  try {
    const response = await fetch("https://lichess.org/api/tournament");
    if (!response.ok) {
      throw new Error(`Error fetching tournaments: ${response.statusText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getTournamentInfo(req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);

  try {
    const response = await fetch(`https://lichess.org/api/tournament/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching tournament info: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);

    res.json(data);
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
