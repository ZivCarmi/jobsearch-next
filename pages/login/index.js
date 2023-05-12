import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Section from "@/components/Section";
import AuthForm from "@/features/auth/AuthForm";
import FormLink from "@/features/auth/FormLink";
import FormCard from "@/components/FormCard";
import { setCredentials, setIsNewUser } from "@/features/auth/authSlice";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    getValues,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const from = router.query.from || "/";

  const fields = {
    email: register("email", {
      required: {
        value: true,
        message: "Email field is required",
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
      onChange: () => {
        clearErrors("serverError");
      },
    }),
    rememberMe: register("rememberMe"),
  };

  const loginHandler = async (data) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        console.log("here");
        return setError("serverError", {
          type: "400",
          message: await response.json(),
        });
      }

      if (!response.ok) {
        return setError("serverError", {
          type: "500",
          message: "Failed to login",
        });
      }

      const responseJson = await response.json();

      if (!data.user?.verified) {
        dispatch(setIsNewUser(true));
      }

      dispatch(setCredentials(responseJson));

      localStorage.setItem("persist", getValues("rememberMe"));

      router.replace(from);
    } catch (error) {
      console.log(error);
      return setError("serverError", {
        type: "500",
        message: "Failed to login",
      });
    }
  };

  useEffect(() => {
    const storagedPersist = JSON.parse(localStorage.getItem("persist"));
    setValue("rememberMe", storagedPersist !== null ? storagedPersist : true);
  }, []);

  return (
    <Section>
      <FormCard title="Login">
        <FormLink
          label="Don't have an account?"
          link={{ url: "/register", title: "Register" }}
        />
        <AuthForm
          page="login"
          onSubmit={handleSubmit(loginHandler)}
          fields={fields}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </FormCard>
    </Section>
  );
};

LoginPage.getLayout = (page) => page;

export default LoginPage;
