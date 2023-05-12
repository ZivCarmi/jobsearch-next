import { useEffect } from "react";
import { useRouter } from "next/router";

import Account from "@/features/account/Account";
import { MyAccountTabs } from "@/pages/myaccount";
import connectDb from "@/server/utils/connectDb";
import JobApplications from "@/models/JobApplication";
import Jobs from "@/models/Job";
import Employers from "@/models/Employer";
import {
  availableJobTypes,
  availableSalaryTypes,
} from "@/server/utils/services";

const MyAccountTab = ({ componentData }) => {
  const router = useRouter();
  const { route } = router.query;

  const findSlugMatchingCmp = () =>
    MyAccountTabs.find((tab) => tab.slug === route);

  const foundComponent = findSlugMatchingCmp();
  const Component = foundComponent?.component;

  useEffect(() => {
    const foundComponent = findSlugMatchingCmp();

    if (route && !foundComponent) {
      router.push("/404");
    }
  }, [router]);

  return (
    <Account
      title="My Account"
      tabs={MyAccountTabs}
      children={<Component route={foundComponent} data={componentData} />}
    />
  );
};

export default MyAccountTab;

export const getServerSideProps = async ({ req, params }) => {
  const { uid } = req.headers;
  const { route } = params;
  let componentData = {};

  if (route === "job-applications") {
    await connectDb();

    let jobApplications = await JobApplications.find({ seeker: uid })
      .sort({ _id: -1 })
      .populate({
        path: "job",
        select: "-__v -updatedAt -createdAt",
        model: Jobs,
      })
      .populate({ path: "employer", select: "company", model: Employers })
      .limit(10)
      .lean({ getters: true });

    componentData = JSON.parse(JSON.stringify(jobApplications));
  }

  return {
    props: {
      componentData,
    },
  };
};
