import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    days: {
      type: Number,
      required: true,
      min: 1,
    },

    budgetType: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    interests: {
      type: [String],
      default: [],
    },

    itinerary: {
      type: Array,
      default: [],
    },

    estimatedBudget: {
      hotel: Number,
      food: Number,
      transport: Number,
      activities: Number,
      total: Number,
    },

    hotels: {
      type: Array,
      default: [],
    },
    packingList: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const Trip = mongoose.model("Trip", tripSchema);
