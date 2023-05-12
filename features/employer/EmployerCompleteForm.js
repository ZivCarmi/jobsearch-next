import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import CompanyFields from "../company/CompanyFields";
import useInput from "@/hooks/useInput";
import useSelect from "@/hooks/useSelect";
import { setIsNewUser, verifyUser } from "../auth/authSlice";
import { isEmpty, isValidUrl } from "@/client/utils";

import CompleteRegistration from "../auth/CompleteRegistration";
import { useUpdateEmployerMutation } from "./employerApiSlice";

const EmployerCompleteForm = ({ countries, companySizes }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formStep, setFormStep] = useState(1);
  const [fNameIsValid, fNameIsError, fNameAttributes] = useInput(isEmpty);
  const [lNameIsValid, lNameIsError, lNameAttributes] = useInput(isEmpty);
  const [cNameIsValid, cNameIsError, cNameAttributes] = useInput(isEmpty);
  const [cSizeIsValid, cSizeIsError, cSizeAttributes] = useSelect(isEmpty);
  const [countryIsValid, countryIsError, countryAttributes] =
    useSelect(isEmpty);
  const [websiteIsValid, websiteIsError, websiteAttributes] = useInput(
    isValidUrl,
    false
  );
  const [updateEmployer, { isLoading }] = useUpdateEmployerMutation();

  const isFirstStepValid = fNameIsValid && lNameIsValid;
  const isSecondStepValid =
    isFirstStepValid &&
    cNameIsValid &&
    cSizeIsValid &&
    countryIsValid &&
    websiteIsValid;

  const submitFirstStepHandler = async () => {
    fNameAttributes.onBlur();
    lNameAttributes.onBlur();

    if (!isFirstStepValid) return;

    setFormStep(2);
  };

  const submitFinalFormHandler = async () => {
    cNameAttributes.onBlur();
    cSizeAttributes.onBlur();
    countryAttributes.onBlur();
    websiteAttributes.onBlur();

    if (!isSecondStepValid) return;

    const enteredData = {
      firstName: fNameAttributes.value,
      lastName: lNameAttributes.value,
      companyName: cNameAttributes.value,
      companySize: cSizeAttributes.defaultValue,
      country: countryAttributes.defaultValue,
      websiteUrl: websiteAttributes.value,
    };

    try {
      await updateEmployer(enteredData);

      dispatch(setIsNewUser(false));
      dispatch(verifyUser(true));
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CompleteRegistration
      currentStep={formStep}
      steps={{
        1: {
          title: "Getting Started",
          intro:
            "Before you can find your right candidates, we will need a little bit of info.",
          onSave: submitFirstStepHandler,
        },
        2: {
          title: `Welcome, ${fNameAttributes.value}`,
          intro:
            "We'll also need to get some info about your company.\nPlease fill the required fields in order to proceed.",
          onSave: submitFinalFormHandler,
          isLoading,
        },
      }}
      fName={{
        fNameIsError,
        fNameAttributes,
      }}
      lName={{
        lNameIsError,
        lNameAttributes,
      }}
    >
      <CompanyFields
        cName={{
          error: cNameIsError,
          attributes: cNameAttributes,
        }}
        cSize={{
          error: cSizeIsError,
          attributes: {
            ...cSizeAttributes,
            options: companySizes,
          },
        }}
        country={{
          error: countryIsError,
          attributes: {
            ...countryAttributes,
            options: countries,
          },
        }}
        websiteUrl={{
          error: websiteIsError,
          attributes: websiteAttributes,
        }}
      />
    </CompleteRegistration>
  );
};

export default EmployerCompleteForm;
