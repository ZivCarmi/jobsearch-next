import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Section from "@/components/Section";
import AuthForm from "@/features/auth/AuthForm";
import FormLink from "@/features/auth/FormLink";
import FormCard from "@/components/FormCard";
import { setCredentials, setIsNewUser } from "@/features/auth/authSlice";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const fields = {
    type: register("type", {
      required: {
        value: true,
        message: "Please select account type",
      },
      validate: (value) => {
        if (value !== "seeker" && value !== "employer") {
          return "Please select a valid option";
        }
      },
    }),
    email: register("email", {
      required: {
        value: true,
        message: "Email Address must be in a valid form",
      },
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Email is not in a valid form",
      },
      onChange: () => {
        clearErrors("serverError");
      },
    }),
    password: register("password", {
      required: {
        value: true,
        message: "Password field is required",
      },
      minLength: {
        value: 6,
        message: "Password must be at least 6 digits long",
      },
      onChange: () => {
        clearErrors("serverError");
      },
    }),
  };

  const registerHandler = async (data) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response?.json();

      if (response.status === 409 || response.status === 422) {
        for (const fieldName in responseJson.errors) {
          setError(
            fieldName,
            {
              type: response.status,
              message: responseJson.errors[fieldName],
            },
            { shouldFocus: true }
          );
        }
      } else {
        localStorage.setItem("persist", true);
        dispatch(setIsNewUser(true));
        dispatch(setCredentials(responseJson));
        router.replace("/complete-registration");
      }
    } catch (error) {
      console.log(error);
      return setError("serverError", {
        type: "500",
        message: "Failed to login",
      });
    }
  };

  return (
    <Section>
      <FormCard title="Register">
        <FormLink
          label="Already have an account?"
          link={{ url: "/login", title: "Login" }}
        />
        <AuthForm
          page="register"
          onSubmit={handleSubmit(registerHandler)}
          fields={fields}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </FormCard>
    </Section>
  );
};

RegisterPage.getLayout = (page) => page;

export default RegisterPage;
