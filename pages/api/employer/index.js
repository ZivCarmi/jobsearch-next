import connectDb from "@/server/utils/connectDb";
import Employers from "@/models/Employer";
import Users from "@/models/User";
import {
  isValidText,
  isValidOption,
  isValidUrl,
} from "@/server/utils/validation";
import {
  availableCompanySize,
  availableCountries,
} from "@/server/utils/services";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const enteredData = req.body;

    const errors = {};

    if (!isValidText(enteredData.firstName)) {
      errors.firstName = "First name cannot be empty";
    }

    if (!isValidText(enteredData.lastName)) {
      errors.lastName = "Last name cannot be empty";
    }

    if (!isValidText(enteredData.companyName)) {
      errors.companyName = "Company name cannot be empty";
    }

    if (!isValidText(enteredData.companySize)) {
      errors.companySize = "Please select company size from the list";
    } else if (!isValidOption(enteredData.companySize, availableCompanySize)) {
      errors.companySize = "Invalid company size option";
    }

    if (!isValidText(enteredData.country)) {
      errors.country = "Please select country from the list";
    } else if (!isValidOption(enteredData.country, availableCountries)) {
      errors.country = "Invalid country option";
    }

    if (
      isValidText(enteredData.websiteUrl) &&
      !isValidUrl(enteredData.websiteUrl)
    ) {
      errors.websiteUrl =
        'URL is invalid, try something like: "https://www.example.com"';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        errors,
      });
    }

    const { uid } = req.headers;
    const validatedData = {
      firstName: enteredData.firstName,
      lastName: enteredData.lastName,
      company: {
        name: enteredData.companyName,
        size: enteredData.companySize,
        country: enteredData.country,
        websiteUrl: enteredData.websiteUrl,
      },
    };

    try {
      await connectDb();

      await Employers.updateOne(
        { _id: uid },
        { $set: { _id: uid, ...validatedData } },
        { upsert: true }
      );

      await Users.findOneAndUpdate(
        { _id: uid },
        { verified: true },
        { new: true }
      );

      return res.status(201).json({});
    } catch (error) {
      // NEED TO HANDLE ERRORS
      console.log(error);
    }
  }
};

export default handler;
