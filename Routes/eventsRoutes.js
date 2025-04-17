import express from "express";

import {
  createEventController,
  getAllEventsController,
  getEventBySlugController,
  eventRegisterController
} from "../Controllers/eventsController.js";

const router = express.Router();

router.post("/create-event", createEventController);

router.get("/get-event/:slug", getEventBySlugController);

router.get("/get-all-events", getAllEventsController);

router.post("/:eventId/register", eventRegisterController);

export default router;
