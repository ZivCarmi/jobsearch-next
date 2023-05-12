import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsEye } from "react-icons/bs";

import JobDate from "../jobs/JobDate";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import AppLink from "@/components/AppLink";
import SingleJobAppModal from "./SingleJobAppModal";

import classes from "../account/JobApps.module.css";

const AccountJobApps = ({ route, data: { data, pagination, totalCount } }) => {
  const router = useRouter();
  const id = router.query.id;
  const page = parseInt(router.query.page);
  const [jobApps, setJobApps] = useState(data);
  const haveJobApps = totalCount > 0;
  const returnUrl = `${route.url}${page ? "?page=" + page : ""}`;

  useEffect(() => {
    setJobApps(data);
  }, [data]);

  const content = jobApps.map((jobApp) => (
    <tr key={jobApp._id}>
      <th>
        <Link
          href={`/managepanel/[route]/?route=job-applications&id=${jobApp._id}`}
          as={`/managepanel/job-applications/${jobApp._id}`}
          className={classes.link}
          title="Job Application page"
        />
      </th>
      <td className={classes.body} width="30%">
        {jobApp.seeker.fullName}
      </td>
      <td className={classes.head} width="15%">
        <span className={classes.status}>{jobApp?.status}</span>
      </td>
      <td width="20%">
        <JobDate className={classes.date} date={jobApp.createdAt} />
      </td>
      <td width="15%">
        {!jobApp.isWatched && <span className={classes.isUpdated}>NEW</span>}
      </td>
      <td width="20%" className={classes.actions}>
        <AppLink
          asIcon
          href={`/managepanel/[route]/?route=job-applications&id=${jobApp._id}&redirect=${returnUrl}&page=${page}`}
          as={`/managepanel/job-applications/${jobApp._id}`}
          shallow
          title="Quick View"
        >
          <BsEye />
        </AppLink>
      </td>
    </tr>
  ));

  return (
    <>
      {!haveJobApps && <p>Seems like you didn't apply to any jobs yet...</p>}
      {haveJobApps && (
        <Table
          header={
            <tr>
              <th width="30%">Candidate</th>
              <th width="15%">Status</th>
              <th width="20%">Date</th>
              <th width="15%"></th>
              <th width="20%">Actions</th>
            </tr>
          }
          body={content}
        />
      )}
      <Pagination pagesCount={pagination.pagesCount} />
      {id && <SingleJobAppModal id={id} setJobApps={setJobApps} />}
    </>
  );
};

export default AccountJobApps;
