import { Schema, models, model } from "mongoose";
import { mongooseLeanGetters } from "mongoose-lean-getters";

import {
  availableJobTypes,
  availableSalaryTypes,
} from "@/server/utils/services";

const jobSchema = new Schema(
  {
    employer: {
      type: Schema.Types.ObjectId,
      required: [true, "Employer is required"],
      ref: "Employers",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    jobType: {
      type: [String],
      required: [true, "Job type is required"],
      enum: {
        values: ["fullTime", "halfTime", "temporary", "shifts", "freelance"],
        message: "{VALUE} is not supported",
      },
      get: (jobTypes) =>
        jobTypes.map((type) => ({
          value: type,
          label: availableJobTypes[type],
        })),
    },
    salaryFrom: {
      type: Number,
      required: [true, "Salary from is required"],
    },
    salaryTo: {
      type: Number,
      required: [true, "Salary to is required"],
    },
    salaryType: {
      type: String,
      required: [true, "Salary type is required"],
      enum: {
        values: ["perHour", "perMonth", "perYear"],
        message: "{VALUE} is not supported",
      },
      get: (salaryType) => ({
        value: salaryType,
        label: availableSalaryTypes[salaryType],
      }),
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    requirements: {
      type: String,
      required: [true, "Requirements is required"],
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

jobSchema.plugin(mongooseLeanGetters);

const Job = models?.Jobs || model("Jobs", jobSchema);

export default Job;
