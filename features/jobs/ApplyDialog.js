import { useRouter } from "next/router";
import { useState } from "react";

import AppLink from "@/components/AppLink";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

import classes from "./ApplyDialog.module.css";

const ApplyDialog = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [jobAppID, setJobAppID] = useState(null);

  const applyHandler = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`);

      const responseJson = await response.json();

      console.log(
        `Successfully applied to job,\nJob application ID: ${responseJson._id}`
      );

      setSuccess(true);
      setJobAppID(responseJson._id);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return success ? (
    <>
      <p>
        Successfully applied to job!
        <br />
        You may track the application process through your account.
      </p>
      <div className={classes.actions}>
        <AppLink href="/jobs" shallow={true}>
          Close
        </AppLink>
        <AppLink href={`/myaccount/job-applications/${jobAppID}`} replace>
          Application process
        </AppLink>
      </div>
    </>
  ) : (
    <>
      <p>Your information will be send to the employer, continue apply?</p>
      <div className={classes.actions}>
        <AppLink href="/jobs" shallow={true}>
          Cancel
        </AppLink>
        <Button button={{ onClick: applyHandler }}>
          {isLoading ? <Spinner text="Applying" /> : "Apply"}
        </Button>
      </div>
    </>
  );
};

export default ApplyDialog;
