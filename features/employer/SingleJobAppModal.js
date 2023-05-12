import { useState } from "react";
import { useRouter } from "next/router";

import Modal from "@/components/Modal";
import SingleJobApp from "./SingleJobApp";
import useFetch from "@/hooks/useFetch";
import Spinner from "@/components/Spinner";
import Card from "@/components/Card";
import ErrorMessage from "@/components/ErrorMessage";
import Button from "@/components/Button";

import classes from "./SingleJobAppModal.module.css";

const SingleJobAppModal = ({ id, setJobApps }) => {
  const router = useRouter();
  const { redirect } = router.query;
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, error } = useFetch(
    id && `/api/employer/job-applications/${id}`
  );

  const closeHandler = () => {
    router.push(redirect, null, { shallow: true });
  };

  const patchStatusRequest = async (status) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/employer/job-applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return setServerError("Something went wrong, please try again");
      }

      router.push(redirect, null, { scroll: false });
      setServerError(null);
    } catch (error) {
      console.log(error);
    }

    setIsSubmitting(false);
  };

  const rejectHandler = async () => {
    patchStatusRequest("inactive");
  };

  const approveHandler = async () => {
    patchStatusRequest("active");
  };

  if (error) return <p>There is an error.</p>;
  if (!data) return <Spinner withOverlay />;

  return (
    <Modal width="500px">
      <Card
        header={
          <div className={classes.header}>
            <h2>Job Application</h2>
            <span className={classes.jobId}>#{id}</span>
          </div>
        }
        footer={
          <>
            <div className={classes.actions}>
              <Button
                children="Close"
                buttonType="secondary"
                button={{
                  onClick: closeHandler,
                }}
              />
              <Button
                children="Reject"
                buttonType="danger"
                button={{
                  onClick: rejectHandler,
                  disabled: isSubmitting,
                }}
              />
              <Button
                children="Approve"
                buttonType="success"
                button={{
                  onClick: approveHandler,
                  disabled: isSubmitting,
                }}
              />
            </div>
            {serverError && <ErrorMessage errors={serverError} />}
          </>
        }
      >
        <SingleJobApp jobApp={data} setJobApps={setJobApps} />
      </Card>
      {isSubmitting && <Spinner withOverlayAsBackground />}
    </Modal>
  );
};

export default SingleJobAppModal;
