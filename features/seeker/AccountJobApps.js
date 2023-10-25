import { BiDetail } from "react-icons/bi";
import { MdPendingActions } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";

import TabCard from "../account/TabCard";
import Grid from "@/components/Grid";
import JobDate from "../jobs/JobDate";
import TextWithIcon from "@/components/TextWithIcon";
import RouteContent from "../account/RouteContent";

import classes from "./AccountJobApps.module.css";

const AccountJobApplications = ({ route, data }) => {
  const router = useRouter();
  const page = parseInt(router.query.page);
  const returnUrl = `${route.url}${page ? "?page=" + page : ""}`;

  return (
    <TabCard title="Job Applications">
      <RouteContent
        fallback={<p>Seems like you didn't apply to any jobs yet...</p>}
        data={data}
      >
        <Grid tag="ul" className={classes.grid}>
          {data.data.map((jobApp) => (
            <li key={jobApp._id}>
              <Link
                href={`/myaccount/[route]/?route=job-applications&id=${jobApp._id}&redirect=${returnUrl}&page=${page}`}
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
            </li>
          ))}
        </Grid>
      </RouteContent>
    </TabCard>
  );
};

export default AccountJobApplications;
