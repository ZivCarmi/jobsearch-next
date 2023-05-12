import { BiDetail } from "react-icons/bi";
import { MdPendingActions } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";

import TabCard from "../account/TabCard";
import Grid from "@/components/Grid";
import JobDate from "../jobs/JobDate";
import Modal from "@/components/Modal";
import SingleJobApp from "./SingleJobApp";
import TextWithIcon from "@/components/TextWithIcon";

import classes from "./AccountJobApps.module.css";

const AccountJobApplications = ({ route, data }) => {
  const router = useRouter();
  const { id } = router.query;
  const hasJobApps = data.length > 0;

  return (
    <TabCard title="Job Applications">
      {!hasJobApps && <p>Seems like you didn't apply to any jobs yet...</p>}
      {hasJobApps && (
        <Grid tag="ul" className={classes.grid}>
          {data.map((jobApp) => (
            <li key={jobApp._id}>
              <Link
                href={`/myaccount/[route]/?route=job-applications&id=${jobApp._id}`}
                as={`/myaccount/job-applications/${jobApp._id}`}
                shallow
                className={classes.link}
              >
                <div className={classes.head}>
                  <TextWithIcon
                    icon={<MdPendingActions size="1.5rem" />}
                    text={
                      <span className={classes.status}>{jobApp?.status}</span>
                    }
                  />
                  <JobDate date={jobApp.createdAt} />
                </div>
                <div className={classes.body}>
                  <TextWithIcon
                    icon={<BiDetail size="1.5rem" />}
                    text={
                      <>
                        {jobApp.job.title} - {jobApp.employer.company.name}
                      </>
                    }
                  />
                </div>
              </Link>
              {id === jobApp._id && (
                <Modal
                  exitHref={route.url}
                  children={<SingleJobApp data={jobApp} />}
                />
              )}
            </li>
          ))}
        </Grid>
      )}
    </TabCard>
  );
};

export default AccountJobApplications;
