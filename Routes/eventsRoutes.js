import express from 'express';
import {addEvent, findAllEvents, findBySlug} from '../Controllers/eventsController.js';

const myRouter = express.Router();

myRouter.post("/addEvent",addEvent);
myRouter.get("/findBySlug",findBySlug);
myRouter.get("/findAllEvents",findAllEvents);

export default myRouter;