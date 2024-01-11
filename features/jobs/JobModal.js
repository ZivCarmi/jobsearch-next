import { useRouter } from "next/router";

import Spinner from "@/components/Spinner";
import JobDetails from "./JobDetails";
import Modal from "@/components/Modal";
import useFetch from "@/hooks/useFetch";
import { BASE_URL } from "@/config";
import { useEffect, useState } from "react";

const JobModal = () => {
  const [data, setData] = useState();
  const router = useRouter();
  const { jobId } = router.query;
  // const { data, error } = useFetch(`${BASE_URL}/api/jobs/${jobId}`, {
  //   cache: "no-cache",
  // });

  useEffect(() => {
    if (!jobId) return;

    const getJobData = async () => {
      const response = await fetch(`/api/jobs/${jobId}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const resJson = await response.json();

      setData(resJson);
    };

    getJobData();
  }, []);

  // if (error) return <p>There is an error.</p>;
  if (!data) return <Spinner withOverlay />;

  return (
    <Modal width="768px">
      <JobDetails job={data} />
    </Modal>
  );
};

export default JobModal;
