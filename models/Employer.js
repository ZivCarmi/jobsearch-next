import { Schema, models, model } from "mongoose";
import mongooseLeanGetters from "mongoose-lean-getters";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

import {
  availableCompanySize,
  availableCountries,
} from "@/server/utils/services";

const companySchema = Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
  },
  size: {
    type: String,
    required: [true, "Company size is required"],
    enum: {
      values: [
        "up10",
        "up50",
        "up200",
        "up500",
        "up1k",
        "up5k",
        "up10k",
        "upmax",
      ],
      message: "{VALUE} is not supported",
    },
    get: (size) => ({ value: size, label: availableCompanySize[size] }),
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    get: (country) => ({
      value: country,
      label: availableCountries[country],
    }),
  },
  websiteUrl: String,
  customApply: {
    required: true,
    default: false,
    type: Boolean,
  },
  applicationUrl: String,
});

const employerSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    company: companySchema,
    jobs: [{ type: Schema.Types.ObjectId, ref: "Jobs", index: true }],
  },
  { timestamps: true }
);

employerSchema.virtual("jobsCount").get(function () {
  return this.jobs.length;
});

employerSchema.plugin(mongooseLeanVirtuals);
employerSchema.plugin(mongooseLeanGetters);

const Employer = models?.Employers || model("Employers", employerSchema);

export default Employer;
