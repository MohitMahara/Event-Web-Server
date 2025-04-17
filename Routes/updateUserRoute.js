import express from 'express';
import { updateEventList } from '../Controllers/updateUser.js';

const myRouter = express.Router();

myRouter.put("/updateEventList",updateEventList);

export default myRouter;