import Link from "next/link";
import { useRouter } from "next/router";
import { BsEye } from "react-icons/bs";

import JobDate from "../jobs/JobDate";
import RouteContent from "@/features/account/RouteContent";
import Table from "@/components/Table";
import AppLink from "@/components/AppLink";

import classes from "./AccountJobs.module.css";

const AccountJobs = ({ route, data }) => {
  const router = useRouter();
  const page = parseInt(router.query.page);
  const returnUrl = `${route.url}${page ? "?page=" + page : ""}`;

  const header = (
    <tr>
      <th width="30%">Title</th>
      <th width="30%">Location</th>
      <th width="20%">Date</th>
      <th width="20%">Actions</th>
    </tr>
  );

  const body = data.data.map((job) => (
    <tr key={job._id}>
      <th>
        <Link
          href={`/managepanel/jobs/${job._id}`}
          className={classes.link}
          title="Edit Job"
        />
      </th>
      <td width="30%">
        <div>{job.title}</div>
      </td>
      <td width="30%">
        <div>{job.location}</div>
      </td>
      <td width="20%">
        <JobDate date={job.createdAt} />
      </td>
      <td width="20%" className={classes.actions}>
        <AppLink
          asIcon
          href={`/managepanel/[route]/?route=jobs&id=${job._id}&redirect=${returnUrl}&page=${page}`}
          as={`/managepanel/jobs/${job._id}`}
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
          You have <strong>{data.totalCount}</strong> Jobs
        </p>
      }
      data={data}
    >
      <Table header={header} body={body} />
    </RouteContent>
  );
};

export default AccountJobs;
