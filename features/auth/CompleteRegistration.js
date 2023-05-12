import { useDispatch } from "react-redux";

import FormCard from "@/components/FormCard";
import Form from "@/components/Form";
import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { setIsNewUser } from "./authSlice";

import classes from "./CompleteRegistration.module.css";

const CompleteRegistration = (props) => {
  const { currentStep } = props;
  const currentStepData = props.steps[currentStep];
  const { fNameIsError, fNameAttributes } = props.fName;
  const { lNameIsError, lNameAttributes } = props.lName;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    currentStepData.onSave(e);
  };

  const skipHandler = () => {
    dispatch(setIsNewUser(false));
  };

  return (
    <FormCard title={currentStepData.title} className={classes.card}>
      <Form className={classes.form} onSubmit={submitHandler}>
        <p className={classes.intro}>{currentStepData.intro}</p>
        <div className={classes.formBody}>
          {currentStep === 1 && (
            <Flex>
              <Input
                label="First Name"
                error={fNameIsError}
                errorMsg="First name is required"
                input={{
                  id: "firstName",
                  type: "text",
                  name: "firstName",
                  ...fNameAttributes,
                }}
              />
              <Input
                label="Last Name"
                error={lNameIsError}
                errorMsg="Last name is required"
                input={{
                  id: "lastName",
                  type: "text",
                  name: "lastName",
                  ...lNameAttributes,
                }}
              />
            </Flex>
          )}
          {currentStep === 2 && props.children}
        </div>
        <div className={classes.actions}>
          {currentStepData.skippable && (
            <button
              type="button"
              className={classes.skip}
              onClick={skipHandler}
            >
              Skip for now
            </button>
          )}
          <button type="submit">
            {currentStepData.isLoading && <Spinner text="Loading..." />}
            {!currentStepData.isLoading && currentStep === 1 && "Continue"}
            {!currentStepData.isLoading && currentStep === 2 && "Finish"}
          </button>
        </div>
      </Form>
    </FormCard>
  );
};

export default CompleteRegistration;
