import { useRouter } from "next/router";
import { useController, useForm } from "react-hook-form";

import Card from "@/components/Card";
import Button from "@/components/Button";
import HireForm from "./HireForm";

const EditJob = ({ data, setJobs }) => {
  const router = useRouter();
  const jobId = router.query?.id;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { field: jobTypeSelect } = useController({
    name: "jobType",
    control,
    defaultValue: data.jobType,
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
    defaultValue: data.salaryType,
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
        value: data.title,
      }),
    },
    location: {
      ...register("location", {
        required: {
          value: true,
          message: "Location is a required field",
        },
        value: data.location,
      }),
    },
    jobType: jobTypeSelect,
    salaryFrom: {
      ...register("salaryFrom", {
        required: {
          value: true,
          message: "Salary from is a required field",
        },
        value: data.salaryFrom,
      }),
    },
    salaryTo: {
      ...register("salaryTo", {
        required: {
          value: true,
          message: "Salary to is a required field",
        },
        value: data.salaryTo,
      }),
    },
    salaryType: salaryTypeSelect,
    description: {
      ...register("description", {
        required: {
          value: true,
          message: "Job description is a required field",
        },
        value: data.description,
      }),
    },
    requirements: {
      ...register("requirements", {
        required: {
          value: true,
          message: "Job requirements is a required field",
        },
        value: data.requirements,
      }),
    },
  };

  const submitHandler = async (data) => {
    if (!jobId) return alert("Missing job ID!");

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      const updatedJob = await response.json();

      setJobs((previousJobs) => {
        const jobIndex = previousJobs.findIndex((job) => job._id === jobId);
        previousJobs[jobIndex] = updatedJob;
        return previousJobs;
      });

      if (response.ok) {
        router.push("/managepanel/jobs", null, { shallow: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      header={<h2>Edit job</h2>}
      footer={
        <Button
          children="Save"
          isLoading={isSubmitting}
          button={{
            type: "submit",
            form: "editJob",
            disabled: isSubmitting,
          }}
        />
      }
    >
      <HireForm
        fields={fields}
        errors={errors}
        isExternalSubmit
        form={{
          id: "editJob",
          onSubmit: handleSubmit(submitHandler),
        }}
      />
    </Card>
  );
};

export default EditJob;
