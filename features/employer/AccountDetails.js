import { useForm } from "react-hook-form";

import Flex from "@/components/Flex";
import Grid from "@/components/Grid";
import Input from "@/components/Input";
import AccountDetailsForm from "../account/AccountDetails";
import TabSection from "../account/TabSection";
import CompanyFields from "../company/CompanyFields";

import classes from "../account/AccountDetails.module.css";

const AccountDetails = ({ userData }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const saveUserHandler = async (data) => {
    try {
      const response = await fetch("api/employer", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 422) {
        const json = await response.json();

        for (const error in json.errors) {
          setError(error, { message: json.errors[error] });
          return;
        }
      }

      if (!response.ok) return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AccountDetailsForm onSave={handleSubmit(saveUserHandler)}>
      <TabSection title="Personal Information">
        <Grid>
          <Flex className={classes.formSection}>
            <Input
              label="First Name"
              error={errors?.firstName?.message}
              input={{
                id: "firstName",
                ...register("firstName", {
                  required: {
                    value: true,
                    message: "First name is a required field",
                  },
                  value: userData.firstName,
                }),
              }}
            />
            <Input
              label="Last Name"
              error={errors?.lastName?.message}
              input={{
                id: "lastName",
                ...register("lastName", {
                  required: {
                    value: true,
                    message: "Last name is a required field",
                  },
                  value: userData.lastName,
                }),
              }}
            />
          </Flex>
        </Grid>
      </TabSection>
      <TabSection title="Company Information">
        <CompanyFields values={userData.company} control={control} />
      </TabSection>
    </AccountDetailsForm>
  );
};

export default AccountDetails;
