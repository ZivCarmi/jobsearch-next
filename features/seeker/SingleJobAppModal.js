import Card from "@/components/Card";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import useFetch from "@/hooks/useFetch";
import SingleJobApp from "./SingleJobApp";

import classes from "./SingleJobApp.module.css";

const SingleJobAppModal = ({ id }) => {
  const { data, error } = useFetch(id && `/api/seeker/job-applications/${id}`);

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
      >
        <SingleJobApp data={data} />
      </Card>
    </Modal>
  );
};

export default SingleJobAppModal;
