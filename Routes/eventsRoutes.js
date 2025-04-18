import express from "express";

import {
  createEventController,
  getAllEventsController,
  getEventBySlugController,
  eventRegisterController,
  getAttendedEventsController,
  deleteEvent,
  updateEvent
} from "../Controllers/eventsController.js";

const router = express.Router();

router.post("/create-event", createEventController);

router.get("/get-event/:slug", getEventBySlugController);

router.get("/get-all-events", getAllEventsController);

router.post("/:eventId/register", eventRegisterController);

router.get("/attended-events/:userId", getAttendedEventsController);

router.delete("/DeleteEvent",deleteEvent);     //router.delete() use kiya for deletion baki dekhlio apne hisab se post rakhna kya

router.put("/UpdateEvent",updateEvent);        //router.put() use kiya for updation baki dekhlio apne hisab se post rakhna kya

export default router;
