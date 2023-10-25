import Link from "next/link";
import { useRouter } from "next/router";
import { BsEye } from "react-icons/bs";

import JobDate from "../jobs/JobDate";
import Table from "@/components/Table";
import AppLink from "@/components/AppLink";
import RouteContent from "@/features/account/RouteContent";

import classes from "../account/JobApps.module.css";

const AccountJobApps = ({ route, data }) => {
  const router = useRouter();
  const page = parseInt(router.query.page);
  const returnUrl = `${route.url}${page ? "?page=" + page : ""}`;

  const header = (
    <tr>
      <th width="30%">Candidate</th>
      <th width="15%">Status</th>
      <th width="20%">Date</th>
      <th width="15%"></th>
      <th width="20%">Actions</th>
    </tr>
  );

  const body = data.data.map((jobApp) => (
    <tr key={jobApp._id}>
      <th>
        <Link
          href={`/managepanel/job-applications/${jobApp._id}`}
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
    <RouteContent
      fallback={<p>Seems like you didn't recieve any applications yet...</p>}
      description={
        <p>
          You have <strong>{data.totalCount}</strong> Job Applications
        </p>
      }
      data={data}
    >
      <Table header={header} body={body} />
    </RouteContent>
  );
};

export default AccountJobApps;
