import { useController, useForm } from "react-hook-form";

import Section from "@/components/Section";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import HireForm from "@/features/employer/hire/HireForm";
import Employers from "@/models/Employer";
import connectDb from "@/server/utils/connectDb";

const HirePage = ({ data }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    getValues,
  } = useForm();
  const { field: jobTypeSelect } = useController({
    name: "jobType",
    control,
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
      }),
    },
    location: {
      ...register("location", {
        required: {
          value: true,
          message: "Location is a required field",
        },
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
      }),
    },
    salaryType: salaryTypeSelect,
    description: {
      ...register("description", {
        required: {
          value: true,
          message: "Job description is a required field",
        },
      }),
    },
    requirements: {
      ...register("requirements", {
        required: {
          value: true,
          message: "Job requirements is a required field",
        },
      }),
    },
  };

  const submitNewJobHandler = async (data) => {
    try {
      const response = await fetch(`/api/jobs/new`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) return;

      const createdJob = await response.json();

      console.log(
        `Job created successfully\nJob page at http://localhost:3000/jobs/${createdJob._id}`
      );

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Section>
      <Container width="1200px">
        <PageTitle title="Post a New Job" />
        <HireForm
          company={data.company}
          fields={fields}
          errors={errors}
          isSubmitting={isSubmitting}
          form={{
            onSubmit: handleSubmit(submitNewJobHandler),
          }}
        />
      </Container>
    </Section>
  );
};

export default HirePage;

export const getServerSideProps = async (context) => {
  const { uid } = context.req.headers;

  await connectDb();

  const data = await Employers.findOne(
    { _id: uid },
    "-_id company.name"
  ).lean();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};
