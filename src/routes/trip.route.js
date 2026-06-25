import { Router } from "express";

import {
  createTrip,
  getAllTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip,
  generateItinerary,
  regenerateDay,
  addActivity,
  removeActivity,
  getPackingList,
} from "../controller/trip.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const tripRouter = Router();

tripRouter.post("/create-trip", authMiddleware, createTrip);
tripRouter.post("/get-all-trip", authMiddleware, getAllTrips);
tripRouter.post("/trip/:id", authMiddleware, getSingleTrip);
tripRouter.post("/trip-update/:id", authMiddleware, updateTrip);
tripRouter.post("/trip-delete/:id", authMiddleware, deleteTrip);
tripRouter.post("/trip/:id/generate", authMiddleware, generateItinerary);
tripRouter.post("/trip/:id/regenerate-day", authMiddleware, regenerateDay);
tripRouter.patch("/trip/:id/activity/add", authMiddleware, addActivity);

tripRouter.patch("/trip/:id/activity/remove", authMiddleware, removeActivity);
tripRouter.post("/trip/:id/packing-list", authMiddleware, getPackingList);

export default tripRouter;
