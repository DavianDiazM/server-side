import { Request, Response } from "express";

export async function getUserStatus(req: Request, res: Response) {
  const { ids } = req.query;
  const response = await fetch(
    `https://lichess.org/api/users/status?ids=${ids}`
  );
  const data = await response.json();
  res.json(data);
}

export async function getUserProfile(req: Request, res: Response) {
  const { username } = req.params;
  const response = await fetch(`https://lichess.org/api/user/${username}`);
  const data = await response.json();
  res.json(data);
}

export async function getUserRatingHistory(req: Request, res: Response) {
  const { username } = req.params;
  const response = await fetch(
    `https://lichess.org/api/user/${username}/rating-history`
  );
  const data = await response.json();
  res.json(data);
}
