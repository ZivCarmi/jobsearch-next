import { useRouter } from "next/router";

import Account from "@/features/account/Account";
import { ManagePanelTabs } from "@/pages/managepanel";
import {
  getEmployerJobApps,
  getEmployerJobs,
} from "@/pages/api/employer/[route]";

const ManagePanelTab = ({ data }) => {
  const router = useRouter();
  const { route, id } = router.query;

  const findSlugMatchingCmp = () =>
    ManagePanelTabs.find((tab) => tab.slug === route);

  const foundComponent = findSlugMatchingCmp();

  const Component = foundComponent?.components.root;
  const ModalComponent = foundComponent?.components?.modal;

  return (
    <>
      <Account
        title="Manage Panel"
        tabs={ManagePanelTabs}
        children={<Component route={foundComponent} data={data} />}
      />
      {ModalComponent && id && <ModalComponent id={id} />}
    </>
  );
};

export default ManagePanelTab;

export const getServerSideProps = async ({ req, params, query }) => {
  const { uid } = req.headers;
  const { route } = params;
  const { page } = query;
  let componentData = "";

  const findSlugMatchingCmp = () =>
    ManagePanelTabs.find((tab) => tab.slug === route);

  const foundComponent = findSlugMatchingCmp();

  if (!foundComponent) {
    return {
      notFound: true,
    };
  }

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
