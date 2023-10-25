import { useDispatch } from "react-redux";

import FormCard from "@/components/FormCard";
import Spinner from "@/components/Spinner";
import { setIsNewUser } from "./authSlice";

import classes from "./CompleteRegistration.module.css";

const CompleteRegistration = (props) => {
  const { currentStep } = props;
  const currentStepData = props.steps[currentStep];
  const dispatch = useDispatch();

  const skipHandler = () => {
    dispatch(setIsNewUser(false));
  };

  return (
    <FormCard title={currentStepData.title} className={classes.card}>
      <form className={classes.form} onSubmit={currentStepData.onSubmit}>
        <p className={classes.intro}>{currentStepData.intro}</p>
        <div className={classes.formBody}>{currentStepData.jsx}</div>
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
            {currentStepData.isSubmitting && <Spinner text="Loading..." />}
            {!currentStepData.isSubmitting && currentStep === 1 && "Continue"}
            {!currentStepData.isSubmitting && currentStep === 2 && "Finish"}
          </button>
        </div>
      </form>
    </FormCard>
  );
};

export default CompleteRegistration;
