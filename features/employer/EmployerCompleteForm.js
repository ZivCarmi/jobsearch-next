import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import CompanyFields from "../company/CompanyFields";
import Flex from "@/components/Flex";
import Input from "@/components/Input";
import { setIsNewUser, verifyUser } from "../auth/authSlice";
import CompleteRegistration from "../auth/CompleteRegistration";

const EmployerCompleteForm = () => {
  const [formStep, setFormStep] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    getValues: firstFormValues,
    handleSubmit,
  } = useForm();

  console.log(firstFormValues());

  const {
    control,
    formState: { isSubmitting },
    handleSubmit: handleSubmit2,
    setError,
  } = useForm();

  const submitFirstStepHandler = async (data) => {
    setFormStep(2);
  };

  const submitFinalFormHandler = async (data) => {
    const enteredData = {
      ...firstFormValues(),
      ...data,
    };

    console.log(enteredData);

    try {
      const response = await fetch("/api/employer", {
        method: "POST",
        body: JSON.stringify(enteredData),
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

      dispatch(setIsNewUser(false));
      dispatch(verifyUser(true));
      router.replace("/");
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
            "Before you can find your right candidates, we will need a little bit of info.",
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
        },
        2: {
          title: `Welcome, ${firstFormValues().firstName}`,
          intro:
            "We'll also need to get some info about your company.\nPlease fill the required fields in order to proceed.",
          onSubmit: handleSubmit2(submitFinalFormHandler),
          jsx: <CompanyFields control={control} />,
          isSubmitting,
        },
      }}
    />
  );
};

export default EmployerCompleteForm;
