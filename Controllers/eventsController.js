import eventsModel from "../Models/eventsModel.js";

export const addEvent = async (req, res) => {
  try {
    const myData = {
      title: "Tech Innovators Meetup 2025",
      slug: "tech-innovators-meetup-2025",
      date: new Date("2025-05-10"),
      time: "15:00",
      venue: "Tech Park Auditorium, New Delhi",
      organizer: "InnovateX Community",
      category: "technology",
      description:
        "Join top innovators, developers, and tech enthusiasts for a day of insightful talks, networking, and exhibitions showcasing the latest in technology.",
      image: "https://example.com/event-banner.jpg",
      registeredUsers: [
        "67ffa682c5d15299c3b74732",
        "67ffa285c5d15299c3b74728",
        "67ffa1b3c5d15299c3b74725",
      ],
    };

    const newEvent = new eventsModel(myData);

    await newEvent.save();

    const populatedEvent = await eventsModel
      .findById(newEvent._id)
      .populate("registeredUsers");

    // console.log(populatedEvent.registeredUsers);

    return res.status(200).send({
      status: 1,
      message: "addEvent Successfully",
      myData: populatedEvent,
    });

  } catch (error) {
    return res.status(400).send({
      status: 0,
      message: "addEvent not added..",
      error: error.message,
      myData: null,
    });
  }
};

export const findBySlug = async (req,res) => {
    const targetedEvent = await eventsModel.findById("67ffee4d5a906627b9890b0a").populate("registeredUsers");

    if(targetedEvent){
        return res.status(200).send({
            status : 1,
            "message" : "Event founded by slug !",
            data : targetedEvent
        });
    }
    else{
        return res.status(400).send({
            status : 0,
            "message" : "Event by specific Slug is not found !",
            data : null
        });
    }

};

export const findAllEvents = async (req,res) => {
    const allExistingEvents = await eventsModel.find().populate("registeredUsers");

    if(allExistingEvents){
        return res.status(200).send({
            status : 1,
            "message" : "all Event Founded !",
            data : allExistingEvents
        });
    }
    else{
        return res.status(200).send({
            status : 0,
            "message" : "no Event occuring currently !",
            data : null
        });
    }
};