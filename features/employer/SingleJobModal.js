import { useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import useFetch from "@/hooks/useFetch";
import SingleJob from "./SingleJob";

const SingleJobModal = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, error } = useFetch(id && `/api/employer/jobs/${id}`);

  if (error) return <p>There is an error.</p>;
  if (!data) return <Spinner withOverlay />;

  return (
    <Modal width="768px">
      <Card
        header={<h2>Edit job</h2>}
        footer={
          <Button
            children="Save"
            isLoading={isSubmitting}
            button={{
              type: "submit",
              form: "editJob",
              disabled: isSubmitting,
            }}
          />
        }
      >
        <SingleJob
          job={data}
          isExternalSubmit
          setIsSubmitting={setIsSubmitting}
        />
      </Card>
    </Modal>
  );
};

export default SingleJobModal;
