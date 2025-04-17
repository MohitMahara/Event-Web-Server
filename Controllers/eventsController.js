import eventsModel from "../Models/eventsModel.js";
import userModel from "../Models/userModel.js";

export const createEventController = async (req, res, next) => {
  try {

    const {title, slug, date, time, venue, organizer, category, description, image} = req.body;

    // validation 

    if(!title || !slug || !date || !time || !venue || !organizer || !category || !description || !image){
       return res.status(400).send({
          success : false,
          msg : "All fields are required",
       })
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



export const getEventBySlugController = async (req,res, next) => {
  try{

   const {slug} = req.params;

   const event = await eventsModel.findOne({slug});


    if(!event){
        return res.status(404).send({
             success : false,
             msg : "Event not found",
        });
    }

    return res.status(200).send({
      success : true,
      msg : "Event found",
      event
    });


  }catch{
    next(error);
  }
};


export const getAllEventsController = async (req, res, next ) => {
  try {
    const allEvents = await eventsModel.find();

    return res.status(200).send({
      success : true,
      msg : "All events fetched successfully",
      allEvents
    })
    
  } catch (error) {
    next(error);
  }
};




export const eventRegisterController = async (req, res, next) => {
  try {
    
    const eventId = req.params.eventId;
    const {userId} = req.body;

    // validataion

    if(!userId){
      return res.status(400).send({
        success : false, 
        msg : "User id is required"
      })
    }

    const user  = await userModel.findById(userId);

    if(!user){
      return res.status(404).send({
        success : false,
        msg : "User not found"
      })
    }
    
    const event = await eventsModel.findById(eventId);

    if(!event){
      return res.status(404).send({
        success : false,
        msg : "Event not found"
      })
    }


    // check if user is already registered for the event

    const isRegistered = event.registeredUsers.includes(userId);

    if(isRegistered){
      return res.status(400).send({
        success : false, 
        msg : "User already registered for this event"
      })
    }

    // register user for the event

     event.registeredUsers.push(user._id)
     await event.save();

     user.allEvents.push(event._id);
     await user.save();

     return res.status(200).send({
      success : true,
      msg : "User registered for the event successfully",
     })

    
  } catch (error) {
    next(error);
  }
}



export const getAttendedEventsController = async (req, res, next) => {
  try {
     const {userId} = req.params;

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).send({
        success : false,
        msg : "User not found"
      })
    }


     await user.populate("allEvents");
     const attendedEvents = user.allEvents;

     return res.status(200).send({
      success : true,
      msg : "Attended events fetched successfully",
      attendedEvents
     })

  } catch (error) {
    next(error);
  }
}