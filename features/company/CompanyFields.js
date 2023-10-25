import { Controller, useWatch } from "react-hook-form";

import Grid from "@/components/Grid";
import Input from "@/components/Input";
import Select from "@/components/Select";
import {
  availableCompanySize,
  availableCountries,
} from "@/server/utils/services";
import { formatSelectOptions } from "@/client/utils/services";
import { isValidUrl } from "@/client/utils";

const CompanyFields = ({ control, values }) => {
  const applyCheckbox = useWatch({
    control,
    name: "applyCheckbox",
    defaultValue: values?.customApply,
  });

  return (
    <Grid>
      <Controller
        control={control}
        name="companyName"
        defaultValue={values?.name || ""}
        rules={{
          required: {
            value: true,
            message: "Company name is required",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Company Name"
            error={error?.message}
            input={{
              id: field.name,
              ...field,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="companySize"
        defaultValue={values?.size || ""}
        rules={{
          required: {
            value: true,
            message: "Company size is a required field",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Select
            label="Company Size"
            error={error?.message}
            select={{
              id: field.name,
              options: formatSelectOptions(availableCompanySize),
              ...field,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        defaultValue={values?.country || ""}
        rules={{
          required: {
            value: true,
            message: "Country is a required field",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Select
            label="Country"
            error={error?.message}
            select={{
              id: field.name,
              options: formatSelectOptions(availableCountries),
              ...field,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="websiteUrl"
        defaultValue={values?.websiteUrl || ""}
        rules={{
          validate: (value) =>
            !value
              ? true
              : isValidUrl(value) ||
                'URL is invalid, try something like: "https://www.example.com"',
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Website"
            error={error?.message}
            input={{
              id: field.name,
              placeholder: "https://",
              ...field,
            }}
          />
        )}
      />
      <div>
        <h4>Job Applyment</h4>
        <span>By default we will handle the process for you</span>
        <Controller
          control={control}
          name="applyCheckbox"
          defaultValue={applyCheckbox}
          render={({ field, fieldState: { error } }) => (
            <Input
              reversed
              label="I have application process in my website"
              error={error?.message}
              input={{
                id: field.name,
                type: "checkbox",
                checked: field.value,
                ...field,
              }}
            />
          )}
        />
        {applyCheckbox && (
          <Controller
            control={control}
            name="applicationUrl"
            defaultValue={values?.applicationUrl || ""}
            rules={{
              required: {
                value: true,
                message:
                  "Application URL is a required field. Uncheck the checkbox if you want to proceed without",
              },
              validate: (value) =>
                !value
                  ? true
                  : isValidUrl(value) ||
                    'URL is invalid, try something like: "https://www.example.com/job-application"',
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Application URL"
                error={error?.message}
                input={{
                  id: field.name,
                  placeholder: "https://",
                  ...field,
                }}
              />
            )}
          />
        )}
      </div>
    </Grid>
  );
};

export default CompanyFields;
