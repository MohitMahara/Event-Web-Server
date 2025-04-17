import express from "express";

import {
  createEventController,
  getAllEventsController,
  getEventBySlugController,
  eventRegisterController,
  getAttendedEventsController
} from "../Controllers/eventsController.js";

const router = express.Router();

router.post("/create-event", createEventController);

router.get("/get-event/:slug", getEventBySlugController);

router.get("/get-all-events", getAllEventsController);

router.post("/:eventId/register", eventRegisterController);

router.get("/attended-events/:userId", getAttendedEventsController);

export default router;
