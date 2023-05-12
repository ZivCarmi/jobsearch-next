import { availableJobTypes, availableSalaryTypes } from "./services";

export const isValidText = (value, minLength = 1) => {
  return value && value.trim().length >= minLength;
};

export const isValidNumber = (value) => {
  return value && !isNaN(value);
};

export const isValidOption = (option, availableOptions) => {
  if (Array.isArray(option)) {
    return option.every((opt) => availableOptions.hasOwnProperty(opt)); // value property because we're working with react-select library that store objects e.g. {value: "exmaple", label: "Example"}
  }

  return availableOptions.hasOwnProperty(option);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const isValidFile = (file, allowedExtensions) => {
  const extension = file.originalFilename.split(".").reverse()[0];

  if (allowedExtensions.indexOf(extension) === -1) {
    return false;
  }

  return true;
};

export const isValidJob = (enteredData) => {
  const errors = {};

  const enteredJobType = enteredData?.jobType.map((type) => type.value);
  const enteredSalaryFrom = parseInt(enteredData?.salaryFrom);
  const enteredSalaryTo = parseInt(enteredData?.salaryTo);
  const enteredSalaryType = enteredData?.salaryType.value;

  if (!isValidText(enteredData.title)) {
    errors.title = "Position title cannot be empty";
  }

  if (!isValidText(enteredData.location)) {
    errors.location = "Location cannot be empty";
  }

  if (!isValidOption(enteredJobType, availableJobTypes)) {
    errors.jobType = "Invalid job type option";
  }

  if (!isValidNumber(enteredSalaryFrom)) {
    errors.salary = "Starting salary must be a positive number";
  } else if (!isValidNumber(enteredSalaryTo)) {
    errors.salary = "Ending salary must be a positive number";
  } else if (enteredSalaryFrom > enteredSalaryTo) {
    errors.salary = "Starting salary cannot be higher than ending salary";
  }

  if (!isValidOption(enteredSalaryType, availableSalaryTypes)) {
    errors.salaryType = "Invalid salary type option";
  }

  if (!isValidText(enteredData.description)) {
    errors.description = "Job description cannot be empty";
  }

  if (!isValidText(enteredData.requirements)) {
    errors.requirements = "Job requirements cannot be empty";
  }

  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    data: {
      ...enteredData,
      jobType: enteredJobType,
      salaryFrom: enteredSalaryFrom,
      salaryTo: enteredSalaryTo,
      salaryType: enteredSalaryType,
    },
  };
};

export const isValidSeeker = (enteredData) => {
  const errors = {};

  if (!isValidText(enteredData.firstName)) {
    errors.firstName = "First name is required";
  }

  if (!isValidText(enteredData.lastName)) {
    errors.lastName = "Last name is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    data: enteredData,
  };
};
