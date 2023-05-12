import Form from "@/components/Form";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
import Grid from "@/components/Grid";
import Button from "@/components/Button";
import CompanyIcon from "@/features/company/CompanyIcon";
import Salary from "./Salary";
import { formatSelectOptions } from "@/client/utils/services";
import {
  availableJobTypes,
  availableSalaryTypes,
} from "@/server/utils/services";

import classes from "./HireForm.module.css";

const HireForm = ({
  form,
  fields,
  errors,
  isExternalSubmit,
  isSubmitting,
  company,
}) => {
  return (
    <Form className={classes.form} {...form}>
      {company && (
        <div className={`${classes.formSection} ${classes.company}`}>
          <div className={classes.info}>
            <CompanyIcon className={classes.icon} company={company} />
            <div>
              <div className={classes.companyName}>{company.name}</div>
            </div>
          </div>
        </div>
      )}
      <div className={classes.formSection}>
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
      </div>
      {!isExternalSubmit && (
        <div className={classes.actions}>
          <Button
            children="Publish"
            isLoading={isSubmitting}
            button={{
              type: "submit",
              disabled: isSubmitting,
            }}
          />
        </div>
      )}
    </Form>
  );
};

export default HireForm;
