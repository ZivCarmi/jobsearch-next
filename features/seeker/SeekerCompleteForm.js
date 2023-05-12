import { useState } from "react";
import { useDispatch } from "react-redux";

import Textarea from "@/components/Textarea";
import CompleteRegistration from "../auth/CompleteRegistration";
import useInput from "@/hooks/useInput";
import { setIsNewUser } from "../auth/authSlice";
import { isEmpty } from "@/client/utils";
import {
  useCreateSeekerMutation,
  useUpdateSeekerMutation,
} from "./seekerApiSlice";

const SeekerCompleteForm = () => {
  const dispatch = useDispatch();
  const [formStep, setFormStep] = useState(1);
  const [fNameIsValid, fNameIsError, fNameAttributes] = useInput(isEmpty);
  const [lNameIsValid, lNameIsError, lNameAttributes] = useInput(isEmpty);
  const [aboutIsError, setAboutIsError] = useState(false);
  const [createSeeker, { isLoading: firstStepLoading }] =
    useCreateSeekerMutation();
  const [updateSeeker, { isLoading: secondStepLoading }] =
    useUpdateSeekerMutation();

  const isFormValid = fNameIsValid && lNameIsValid;

  const submitFirstStepHandler = async () => {
    fNameAttributes.onBlur();
    lNameAttributes.onBlur();

    if (!isFormValid) return;

    const enteredData = {
      firstName: fNameAttributes.value,
      lastName: lNameAttributes.value,
    };

    try {
      await createSeeker(enteredData);

      setFormStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const submitFinalFormHandler = async (e) => {
    setAboutIsError(false);

    const enteredData = {
      about: e.target.about.value,
    };

    if (!isEmpty(enteredData.about)) {
      return setAboutIsError(true);
    }

    try {
      await updateSeeker(enteredData);

      dispatch(setIsNewUser(false));
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
            "Before you can start applying for jobs, we will need some info about you.",
          onSave: submitFirstStepHandler,
          isLoading: firstStepLoading,
        },
        2: {
          title: `Welcome, ${fNameAttributes.value}`,
          intro:
            "Let's get to know you better, shall we?\nDescribe your expertise for example.",
          onSave: submitFinalFormHandler,
          isLoading: secondStepLoading,
          skippable: true,
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
      <Textarea
        label="About"
        error={aboutIsError}
        errorMsg="Please provide some details about you"
        textarea={{
          id: "about",
          name: "about",
          onChange: (e) => e.target.value && setAboutIsError(false),
        }}
      />
    </CompleteRegistration>
  );
};

export default SeekerCompleteForm;
