import eventsModel from "../Models/eventsModel.js";
import userModel from "../Models/userModel.js";
import formidable from "formidable";
import cloudinary from "../Utils/cloudinary.js";

export const createEventController = async (req, res, next) => {
  try {

    // parsing form data using formidable
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {

      if (err) {
        return res.status(400).send({
          success: false,
          msg: "Error parsing form data",
        });
      }

      try{

      const image = files?.image[0]?.filepath;


      const { title,slug,date,time,venue,organizer,category,description,createdBy } = fields;

      // validation

      if ( !title || !slug || !date || !time || !venue || !organizer || !category || !description || !createdBy ) {
        return res.status(400).send({
          success: false,
          msg: "All fields are required",
        });
      }

      const user = await userModel.findById(createdBy[0]);

      if(!user){
        return res.status(400).send({
           success : false,
           msg : "User not found"
        })
      }


      const result = await cloudinary.uploader.upload(image, {
        folder: "events",
      });

      const imageURL = result.secure_url;

      if(!imageURL){
        return res.status(400).send({
           success : false,
            msg : "Image upload failed",
        })
      }

      const newEvent = await new eventsModel({
        title : title[0],
        slug : slug[0],
        date : date[0],
        time : time[0],
        venue : venue[0],
        organizer : organizer[0],
        category : category[0],
        description : description[0],
        image: imageURL,
        createdBy : createdBy[0],
        registeredUsers: [],
      }).save();

       user.createdEvents.push(newEvent._id);
       await user.save(); 

      return res.status(200).send({
        success: true,
        msg: "Event created Successfully",
      });

    }catch(error){
       return res.status(400).send({
         success : "false",
         msg : error.message,
       })
     }

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

    user.registeredEvents.push(event._id);
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

    await user.populate("registeredEvents");
    const attendedEvents = user.registeredEvents;

    return res.status(200).send({
      success: true,
      msg: "Attended events fetched successfully",
      attendedEvents,
    });
  } catch (error) {
    next(error);
  }
};
