import userModel from "../Models/userModel.js";
import eventsModel from "../Models/eventsModel.js";

export const updateEventList = async (req, res) => {
  try {
    const userId = "67ef5ff8a733fda61c2ea9b1";
    const newEventSlug = "tech-innovators-meetup-2025";

    const myRecord = await userModel.findById(userId);
    const myEventDetail = await eventsModel.findOne({ slug: newEventSlug });

    if (myRecord && myEventDetail) {
      if (!myRecord.allEvents.includes(myEventDetail._id)) {
        myRecord.allEvents.push(myEventDetail._id);
        await myRecord.save();
      }

      const populatedEvents = await myRecord.populate("allEvents");

      return res.status(200).send({
        status: 1,
        message: "Event added to user's allEvents",
        updatedData: populatedEvents,
      });
    } else {
      return res.status(404).send({
        status: 0,
        message: "User or Event not found",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: 0,
      message: "Internal server error",
      error: e.message,
    });
  }
};