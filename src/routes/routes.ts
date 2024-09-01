import { Router } from "express";
import {
  getUserProfile,
  getUserStatus,
  getUserRatingHistory,
} from "../controllers/user.controller";
import { getGameById, getGameByUser } from "../controllers/game.controller";
import {
  getTournamentsCurrent,
  getTournamentInfo,
} from "../controllers/tournaments.controller";

const router = Router();
//user endpoints
router.get("/user-status", getUserStatus);
router.get("/user-profile/:username", getUserProfile);
router.get("/user-rating-history/:username", getUserRatingHistory);

//game endpoints
router.get("/game/:gameId", getGameById);
router.get("/games-by-user/:username", getGameByUser);

//game tournament
router.get("/tournaments", getTournamentsCurrent);
router.get("/tournament/:id", getTournamentInfo);
export default router;
