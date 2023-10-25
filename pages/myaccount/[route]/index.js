import { useRouter } from "next/router";

import Account from "@/features/account/Account";
import { MyAccountTabs } from "@/pages/myaccount";
import { getSeekerJobApps } from "@/pages/api/seeker/[route]";

const MyAccountTab = ({ data }) => {
  const router = useRouter();
  const { route, id } = router.query;

  const findSlugMatchingCmp = () =>
    MyAccountTabs.find((tab) => tab.slug === route);

  const foundComponent = findSlugMatchingCmp();

  const Component = foundComponent?.components?.root;
  const ModalComponent = foundComponent?.components?.modal;

  return (
    <>
      <Account
        title="My Account"
        tabs={MyAccountTabs}
        children={<Component route={foundComponent} data={data} />}
      />
      {ModalComponent && id && <ModalComponent id={id} />}
    </>
  );
};

export default MyAccountTab;

export const getServerSideProps = async ({ req, params, query }) => {
  const { uid } = req.headers;
  const { route } = params;
  const { page } = query;
  let componentData = "";

  const findSlugMatchingCmp = () =>
    MyAccountTabs.find((tab) => tab.slug === route);

  const foundComponent = findSlugMatchingCmp();

  if (!foundComponent) {
    return {
      notFound: true,
    };
  }

  if (route === "job-applications") {
    componentData = await getSeekerJobApps(uid, page);
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(componentData)),
    },
  };
};
