import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import CompleteRegistration from "../auth/CompleteRegistration";
import { setIsNewUser, verifyUser } from "../auth/authSlice";
import Textarea from "@/components/Textarea";
import Flex from "@/components/Flex";
import Input from "@/components/Input";

const SeekerCompleteForm = () => {
  const dispatch = useDispatch();
  const [formStep, setFormStep] = useState(1);
  const {
    register,
    handleSubmit,
    getValues: firstFormValues,
    formState: { errors, isSubmitting: firstFormSubmitting },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isSubmitting: secondFormSubmitting },
  } = useForm();

  const submitFirstStepHandler = async (data) => {
    try {
      const response = await fetch("/api/seeker", {
        method: "POST",
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

      dispatch(verifyUser(true));

      setFormStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const submitFinalFormHandler = async (data) => {
    try {
      const response = await fetch("/api/seeker", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) return;

      dispatch(setIsNewUser(false));
    } catch (error) {
      console.log(error);
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
          onSubmit: handleSubmit(submitFirstStepHandler),
          jsx: (
            <Flex>
              <Input
                label="First Name"
                error={errors?.firstName?.message}
                input={{
                  id: "firstName",
                  ...register("firstName", {
                    required: {
                      value: true,
                      message: "First name is required",
                    },
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
                      message: "Last name is required",
                    },
                  }),
                }}
              />
            </Flex>
          ),
          isSubmitting: firstFormSubmitting,
        },
        2: {
          title: `Welcome, ${firstFormValues().firstName}`,
          intro:
            "Let's get to know you better, shall we?\nDescribe your expertise for example.",
          onSubmit: handleSubmit2(submitFinalFormHandler),
          jsx: (
            <Textarea
              label="About"
              error={errors2?.about?.message}
              textarea={{
                id: "about",
                ...register2("about", {
                  required: {
                    value: true,
                    message: "Please provide some details about you",
                  },
                }),
              }}
            />
          ),
          isSubmitting: secondFormSubmitting,
          skippable: true,
        },
      }}
    />
  );
};

export default SeekerCompleteForm;
