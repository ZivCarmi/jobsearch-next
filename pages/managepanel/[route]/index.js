import { useEffect } from "react";
import { useRouter } from "next/router";

import Account from "@/features/account/Account";
import { ManagePanelTabs } from "@/pages/managepanel";
import {
  getEmployerJobApps,
  getEmployerJobs,
} from "@/pages/api/employer/[route]";

const ManagePanelTab = ({ data }) => {
  const router = useRouter();
  const { route } = router.query;

  const findSlugMatchingCmp = () =>
    ManagePanelTabs.find((tab) => tab.slug === route);

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
      title="Manage Panel"
      tabs={ManagePanelTabs}
      children={<Component route={foundComponent} data={data} />}
    />
  );
};

export default ManagePanelTab;

export const getServerSideProps = async ({ req, params, query }) => {
  const { uid } = req.headers;
  const { route } = params;
  const { page } = query;
  let componentData = "";

  if (route === "jobs") {
    componentData = await getEmployerJobs(uid, page);
  } else if (route === "job-applications") {
    componentData = await getEmployerJobApps(uid, page);
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(componentData)),
    },
  };
};
