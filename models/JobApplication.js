import { Schema, models, model } from "mongoose";
import mongooseLeanGetters from "mongoose-lean-getters";

import { availableJobAppStatuses } from "@/server/utils/services";

const jobApplicationSchema = new Schema(
  {
    status: {
      type: String,
      required: [true, "Status is required"],
      default: "pending",
      enum: {
        values: ["pending", "active", "inactive"],
        message: "{VALUE} is not supported",
      },
      get: (status) => availableJobAppStatuses[status],
    },
    seeker: {
      type: Schema.Types.ObjectId,
      required: [true, "Seeker ID is required"],
      ref: "Seekers",
    },
    employer: {
      type: Schema.Types.ObjectId,
      required: [true, "Employer ID is required"],
      ref: "Employers",
    },
    job: {
      type: Schema.Types.ObjectId,
      required: [true, "Job ID is required"],
      ref: "Jobs",
    },
    isWatched: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

jobApplicationSchema.plugin(mongooseLeanGetters);

const JobApplication =
  models?.JobApplications || model("JobApplications", jobApplicationSchema);

export default JobApplication;
