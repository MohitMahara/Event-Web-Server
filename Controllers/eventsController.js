import eventsModel from "../Models/eventsModel.js";
import userModel from "../Models/userModel.js";

export const createEventController = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      date,
      time,
      venue,
      organizer,
      category,
      description,
      image,
    } = req.body;

    // validation

    if (
      !title ||
      !slug ||
      !date ||
      !time ||
      !venue ||
      !organizer ||
      !category ||
      !description ||
      !image
    ) {
      return res.status(400).send({
        success: false,
        msg: "All fields are required",
      });
    }

    const newEvent = new eventsModel({
      title,
      slug,
      date,
      time,
      venue,
      organizer,
      category,
      description,
      image,
      registeredUsers: [],
    }).save();

    return res.status(200).send({
      success: true,
      msg: "Event created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getEventBySlugController = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const event = await eventsModel.findOne({ slug });

    if (!event) {
      return res.status(404).send({
        success: false,
        msg: "Event not found",
      });
    }

    return res.status(200).send({
      success: true,
      msg: "Event found",
      event,
    });
  } catch {
    next(error);
  }
};

export const getAllEventsController = async (req, res, next) => {
  try {
    const allEvents = await eventsModel.find();

    return res.status(200).send({
      success: true,
      msg: "All events fetched successfully",
      allEvents,
    });
  } catch (error) {
    next(error);
  }
};

export const eventRegisterController = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const { userId } = req.body;

    // validataion

    if (!userId) {
      return res.status(400).send({
        success: false,
        msg: "User id is required",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    const event = await eventsModel.findById(eventId);

    if (!event) {
      return res.status(404).send({
        success: false,
        msg: "Event not found",
      });
    }

    // check if user is already registered for the event

    const isRegistered = event.registeredUsers.includes(userId);

    if (isRegistered) {
      return res.status(400).send({
        success: false,
        msg: "User already registered for this event",
      });
    }

    // register user for the event

    event.registeredUsers.push(user._id);
    await event.save();

    user.allEvents.push(event._id);
    await user.save();

    return res.status(200).send({
      success: true,
      msg: "User registered for the event successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAttendedEventsController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User not found",
      });
    }

    await user.populate("allEvents");
    const attendedEvents = user.allEvents;

    return res.status(200).send({
      success: true,
      msg: "Attended events fetched successfully",
      attendedEvents,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  const { slug, email } = req.body;

  if (!slug || !email) {
    return res.status(400).send({
      status: 0,
      message: "Please give Complete Details",
    });
  }

  try {
    const eventToBeDeleted = await eventsModel.findOneAndDelete({ slug });   //findOneAndDelete
    const UserDataToBeUpdated = await userModel.findOne({email});
    
    if (!eventToBeDeleted) {
      return res.status(400).send({
        status: 0,
        message: "Event not found so Deletion is not Possible..",
      });
    }

    if(!UserDataToBeUpdated){
      return res.status(400).send({
        status: 0,
        message: "User not found so Deletion is not Possible..",
      });
    }
    
    const ID = eventToBeDeleted._id; //us delete krne wale ki ID jisko hume remove krna hai us allEvent wale array jo Userchema mein hai bcz allEvents is the array of ID's not slug that's why us slug ki madad se mene ID leli ab delete krdunga us ID ko allEvents mein se bhi

    const eventExists = UserDataToBeUpdated.allEvents.some(eventId => eventId.equals(ID));

    if(eventExists){
      UserDataToBeUpdated.allEvents.pull(ID);
      await UserDataToBeUpdated.save();
    }

    return res.status(200).send({
      status: 1,
      message: "Event Details Updated Successfully...",
    });
  } catch (e) {
    return res.status(400).send({
      status: 0,
      "error-message": `Event not Deleted due to Server Error ${e.message}`,
    });
  }
};

export const updateEvent = async (req, res, next) => {
  const { slug, title, image, description } = req.body;

  //validation
  if (!slug || !title || !image || !description) {
    return res.status(400).send({
      status: 0,
      message: "Please give Complete Details",
    });
  }

  try {
    const eventToBeUpdated = await eventsModel.findOne({ slug });

    if (!eventToBeUpdated) {
      return res.status(400).send({
        status: 0,
        message: "Event not found so Updation is not Possible..",
      });
    }

    //updating Event
    eventToBeUpdated.title = title;
    eventToBeUpdated.image = image;
    eventToBeUpdated.description = description;

    //saving that Updation in DB
    await eventToBeUpdated.save();

    return res.status(200).send({
      status: 1,
      message: "Event Details Updated Successfully...",
    });
  } catch (e) {
    return res.status(400).send({
      status: 0,
      "error-message": `Event not Updated due to Server Error ${e.message}`,
    });
  }
};