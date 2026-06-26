import { Trip } from "../model/trip.model.js";
import {
  generateTripPlan,
  regenerateSingleDay,
  generatePackingList,
} from "../services/ai.service.js";

export const createTrip = async (req, res, next) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    if (!destination || !days || !budgetType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      days,
      budgetType,
      interests,
    });

    return res.status(201).json({
      success: true,
      message: "Trip created",
      trip,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    next(error);
  }
};

export const generateItinerary = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const aiResponse = await generateTripPlan({
      destination: trip.destination,
      days: trip.days,
      budgetType: trip.budgetType,
      interests: trip.interests,
    });

    trip.itinerary = aiResponse.itinerary || [];

    trip.estimatedBudget = aiResponse.estimatedBudget || {};

    trip.hotels = aiResponse.hotels || [];

    await trip.save();

    return res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    next(error);
  }
};

export const regenerateDay = async (req, res, next) => {
  try {
    const { day } = req.body;

    if (!day) {
      return res.status(400).json({
        success: false,
        message: "Day is required",
      });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const regeneratedDay = await regenerateSingleDay({
      destination: trip.destination,
      day,
      budgetType: trip.budgetType,
      interests: trip.interests,
    });

    const dayIndex = trip.itinerary.findIndex(
      (item) => item.day === Number(day),
    );

    if (dayIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Day not found",
      });
    }

    trip.itinerary[dayIndex] = regeneratedDay;

    await trip.save();

    return res.status(200).json({
      success: true,
      message: `Day ${day} regenerated`,
      trip,
    });
  } catch (error) {
    next(error);
  }
};
export const removeActivity = async (req, res, next) => {
  try {
    const { day, activityIndex } = req.body;

    if (day === undefined || activityIndex === undefined) {
      return res.status(400).json({
        success: false,
        message: "Day and activityIndex are required",
      });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const dayData = trip.itinerary.find((item) => item.day === Number(day));

    if (!dayData) {
      return res.status(404).json({
        success: false,
        message: "Day not found",
      });
    }

    if (activityIndex < 0 || activityIndex >= dayData.activities.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid activity index",
      });
    }

    dayData.activities.splice(activityIndex, 1);

    trip.markModified("itinerary");

    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Activity removed successfully",
      trip,
    });
  } catch (error) {
    next(error);
  }
};
export const addActivity = async (req, res, next) => {
  try {
    const { day, activity } = req.body;

    if (!day || !activity) {
      return res.status(400).json({
        success: false,
        message: "Day and activity are required",
      });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const dayData = trip.itinerary.find((item) => item.day === Number(day));

    if (!dayData) {
      return res.status(404).json({
        success: false,
        message: "Day not found",
      });
    }

    dayData.activities.push(activity);

    trip.markModified("itinerary");

    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Activity added successfully",
      trip,
    });
  } catch (error) {
    next(error);
  }
};
export const getPackingList = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const aiResponse = await generatePackingList({
      destination: trip.destination,
      days: trip.days,
      interests: trip.interests,
    });

    trip.packingList = aiResponse.items || [];

    await trip.save();

    return res.status(200).json({
      success: true,
      packingList: trip.packingList,
    });
  } catch (error) {
    next(error);
  }
};
