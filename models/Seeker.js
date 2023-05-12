import { Schema, models, model } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const seekerSchema = new Schema(
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
    resume: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

seekerSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

seekerSchema.plugin(mongooseLeanVirtuals);

const Seeker = models?.Seekers || model("Seekers", seekerSchema);

export default Seeker;
