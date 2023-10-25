import Form from "../../components/Form";
import Grid from "../../components/Grid";
import Flex from "../../components/Flex";
import Input from "../../components/Input";
import ErrorMessage from "@/components/ErrorMessage";
import Button from "@/components/Button";
import FormErrors from "@/components/FormErrors";

import classes from "./AuthForm.module.css";

const AuthForm = ({ fields, errors, onSubmit, isSubmitting, page }) => {
  return (
    <Form noValidate onSubmit={onSubmit}>
      <FormErrors errors={errors?.serverError?.message} />
      {page === "register" && (
        <div className={classes.accountType}>
          <Flex>
            <Input
              className={classes.radio}
              label="I'm a job seeker"
              reversed
              input={{
                id: "seeker",
                type: "radio",
                value: "seeker",
                ...fields.type,
              }}
            />
            <Input
              className={classes.radio}
              label="I'm hiring for a job"
              reversed
              input={{
                id: "employer",
                type: "radio",
                value: "employer",
                ...fields.type,
              }}
            />
          </Flex>
          <ErrorMessage>{errors?.type?.message}</ErrorMessage>
        </div>
      )}
      <Grid>
        <Input
          label="Email Address"
          error={errors?.email?.message}
          input={{
            id: "email",
            type: "email",
            ...fields.email,
          }}
        />
        <Input
          label="Password"
          error={errors?.password?.message}
          input={{
            id: "password",
            type: "password",
            ...fields.password,
          }}
        />
        {page === "login" && (
          <Input
            className={classes.checkbox}
            label="Remember me"
            reversed
            input={{
              id: "rememberMe",
              type: "checkbox",
              ...fields.rememberMe,
            }}
          />
        )}
      </Grid>
      <div className={classes.actions}>
        <Button
          isLoading={isSubmitting}
          loadingText="Submitting..."
          children="Submit"
          button={{
            type: "submit",
          }}
        />
      </div>
    </Form>
  );
};

export default AuthForm;
