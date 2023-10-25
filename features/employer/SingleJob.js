import { useController, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

import HireForm from "./hire/HireForm";

const SingleJob = ({ job, setIsSubmitting, isExternalSubmit = false }) => {
  const router = useRouter();
  const { redirect } = router.query;
  const {
    control,
    register,
    handleSubmit,
    setError,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();
  const { field: jobTypeSelect } = useController({
    name: "jobType",
    control,
    defaultValue: job?.jobType,
    rules: {
      required: {
        value: true,
        message: "Job type is a required field",
      },
    },
  });
  const { field: salaryTypeSelect } = useController({
    name: "salaryType",
    control,
    defaultValue: job?.salaryType,
    rules: {
      required: {
        value: true,
        message: "Salary type is a required field",
      },
    },
  });

  const fields = {
    title: {
      ...register("title", {
        required: {
          value: true,
          message: "Position title is a required field",
        },
        value: job?.title,
      }),
    },
    location: {
      ...register("location", {
        required: {
          value: true,
          message: "Location is a required field",
        },
        value: job?.location,
      }),
    },
    jobType: jobTypeSelect,
    salaryFrom: {
      ...register("salaryFrom", {
        required: {
          value: true,
          message: "Salary from is a required field",
        },
        onChange: (e) => {
          Boolean(getValues().salaryTo) && trigger("salaryFrom");
        },
        setValueAs: (v) => parseInt(v),
        validate: (value) =>
          value <= getValues().salaryTo ||
          "Starting salary cannot be higher than ending salary",
        value: job?.salaryFrom,
      }),
    },
    salaryTo: {
      ...register("salaryTo", {
        required: {
          value: true,
          message: "Salary to is a required field",
        },
        onChange: (e) => {
          trigger("salaryTo");
          trigger("salaryFrom");
        },
        setValueAs: (v) => parseInt(v),
        value: job?.salaryTo,
      }),
    },
    salaryType: salaryTypeSelect,
    description: {
      ...register("description", {
        required: {
          value: true,
          message: "Job description is a required field",
        },
        value: job?.description,
      }),
    },
    requirements: {
      ...register("requirements", {
        required: {
          value: true,
          message: "Job requirements is a required field",
        },
        value: job?.requirements,
      }),
    },
  };

  const submitHandler = async (data) => {
    try {
      const response = await fetch(`/api/jobs/${job._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (response.status === 422) {
        const json = await response.json();

        for (const error in json.errors) {
          setError(error, { message: json.errors[error] });
        }

        return;
      }

      if (!response.ok) return;

      router.push(redirect, null, { scroll: false });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setIsSubmitting(isSubmitting);
  // }, [isSubmitting]);

  return (
    <HireForm
      fields={fields}
      errors={errors}
      isExternalSubmit={isExternalSubmit}
      form={{
        id: "editJob",
        onSubmit: handleSubmit(submitHandler),
      }}
    />
  );
};

export default SingleJob;
