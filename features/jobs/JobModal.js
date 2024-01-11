import { useRouter } from "next/router";

import Spinner from "@/components/Spinner";
import JobDetails from "./JobDetails";
import Modal from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import { BASE_URL } from "@/config";

const JobModal = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const { data, error } = useFetch(`${BASE_URL}/api/jobs/${jobId}`);

  console.log(`${BASE_URL}/api/jobs/${jobId}`);

  console.log(jobId, data, error);

  if (error) return <p>There is an error.</p>;
  if (!data) return <Spinner withOverlay />;

  return (
    <Modal width="768px">
      <JobDetails job={data} />
    </Modal>
  );
};

export default JobModal;
