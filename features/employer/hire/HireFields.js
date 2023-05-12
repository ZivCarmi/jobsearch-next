import Grid from "@/components/Grid";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Salary from "./Salary";
import {
  availableJobTypes,
  availableSalaryTypes,
} from "@/server/utils/services";
import { formatSelectOptions } from "@/client/utils/services";

const HireFields = ({ fields, errors }) => {
  return (
    <Grid>
      <Input
        label="Position title"
        error={errors?.title?.message}
        input={{
          id: "position",
          ...fields.title,
        }}
      />
      <Input
        label="Location"
        error={errors?.location?.message}
        input={{
          id: "location",
          ...fields.location,
        }}
      />
      <Select
        label="Job Type"
        error={errors?.jobType?.message}
        select={{
          ...fields.jobType,
          id: "jobType",
          isMulti: true,
          placeholder: "Choose job types...",
          options: formatSelectOptions(availableJobTypes),
        }}
      />
      <Salary
        data={{
          from: {
            isError: errors?.salaryFrom?.message,
            attributes: {
              ...fields.salaryFrom,
            },
          },
          to: {
            isError: errors?.salaryTo?.message,
            attributes: {
              ...fields.salaryTo,
            },
          },
          type: {
            isError: errors?.salaryType?.message,
            attributes: {
              ...fields.salaryType,
              options: formatSelectOptions(availableSalaryTypes),
            },
          },
        }}
      />
      <Textarea
        label="Job Description"
        error={errors?.description?.message}
        textarea={{
          id: "description",
          placeholder: "Provide some details about the position",
          ...fields.description,
        }}
      />
      <Textarea
        label="Job Requirements"
        error={errors?.requirements?.message}
        textarea={{
          id: "requirements",
          placeholder:
            "What are the requirements you are looking from your candidates?",
          ...fields.requirements,
        }}
      />
    </Grid>
  );
};
export default HireFields;
