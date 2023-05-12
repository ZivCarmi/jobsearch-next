import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { getUser } from "../auth/authSlice";
import Modal from "@/components/Modal";
import ApplyCard from "./ApplyCard";
import Spinner from "@/components/Spinner";
import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card";

const ApplyModal = ({ canApply }) => {
  const router = useRouter();
  const { jobId } = router.query;
  const user = useSelector(getUser);
  const { data, error } = useFetch(`/api/jobs/${jobId}`);

  useEffect(() => {
    if (!user?.verified) {
      router.push("/complete-registration");
    }
  }, [jobId]);

  if (error) return <p>There is an error.</p>;
  if (!data) return <Spinner withOverlay />;

  return (
    <Modal width="500px">
      <Card
        header={
          <h2>
            {data?.title} - {data?.employer.company.name}
          </h2>
        }
      >
        <ApplyCard canApply={canApply} />
      </Card>
    </Modal>
  );
};

export default ApplyModal;
