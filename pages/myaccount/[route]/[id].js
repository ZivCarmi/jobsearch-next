import { useRouter } from "next/router";

import { MyAccountTabs } from "..";
import { getSeekerJobApp } from "@/pages/api/seeker/[route]/[id]";

const MyAccountSinglePage = ({ data }) => {
  const router = useRouter();
  const { route } = router.query;

  const findSlugMatchingCmp = () =>
    MyAccountTabs.find((tab) => tab.slug === route);

  const SinglePageComponent = findSlugMatchingCmp()?.components.single;

  return SinglePageComponent && <SinglePageComponent data={data} />;
};

export default MyAccountSinglePage;

export const getServerSideProps = async ({ params }) => {
  const { route, id } = params;
  let componentData = "";

  if (route === "job-applications") {
    componentData = await getSeekerJobApp(id);
  }

  if (!componentData) {
    return {
      redirect: {
        permanent: false,
        destination: `/myaccount/${route}`,
      },
    };
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(componentData)),
    },
  };
};
