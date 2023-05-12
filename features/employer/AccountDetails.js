import { useSelector } from "react-redux";
import { useController, useForm } from "react-hook-form";

import Flex from "../../components/Flex";
import Grid from "../../components/Grid";
import Input from "../../components/Input";
import AccountDetailsForm from "../account/AccountDetails";
import TabSection from "../account/TabSection";
import CompanyFields from "../company/CompanyFields";

import classes from "../account/AccountDetails.module.css";
import { isValidUrl } from "@/client/utils";

const AccountDetails = ({ userData, countries, companySizes }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { field: companySizeSelect } = useController({
    name: "companySize",
    control,
    defaultValue: userData.company.size,
    rules: {
      required: {
        value: true,
        message: "Company size is a required field",
      },
    },
  });
  const { field: countrySelect } = useController({
    name: "country",
    control,
    defaultValue: userData.company.country,
    rules: {
      required: {
        value: true,
        message: "Country is a required field",
      },
    },
  });
  const token = useSelector((state) => state.auth.token);

  const saveUserHandler = async (data) => {
    console.log(data);
    // const enteredData = {
    //   firstName: e.target.firstName.value,
    //   lastName: e.target.lastName.value,
    //   companyName: e.target.companyName.value,
    //   companySize: e.target.companySize.value,
    //   country: e.target.country.value,
    //   websiteUrl: e.target.websiteUrl.value,
    // };

    // const response = await fetch("api/employer", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(enteredData),
    // });

    // const data = await response.json();

    // if (response.status === 422) {
    //   setErrors(data.errors);
    //   return;
    // }

    // setErrors(null);
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
        <CompanyFields
          cName={{
            error: errors?.companyName?.message,
            attributes: {
              ...register("companyName", {
                required: {
                  value: true,
                  message: "Company name is a required field",
                },
                value: userData.company.name,
              }),
            },
          }}
          cSize={{
            error: errors?.companySize?.message,
            attributes: {
              ...companySizeSelect,
              options: companySizes,
            },
          }}
          country={{
            error: errors?.country,
            attributes: {
              ...countrySelect,
              options: countries,
            },
          }}
          websiteUrl={{
            error: errors?.websiteUrl?.message,
            attributes: {
              ...register("websiteUrl", {
                validate: (value) => {
                  if (!value) return true;

                  return (
                    isValidUrl(value) ||
                    'URL is invalid, try something like: "https://www.example.com"'
                  );
                },
                value: userData.company.websiteUrl,
              }),
            },
          }}
        />
      </TabSection>
    </AccountDetailsForm>
  );
};

export default AccountDetails;
