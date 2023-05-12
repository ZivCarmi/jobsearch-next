import Account from "@/features/account/Account";
import AccountSettings from "@/features/account/AccountSettings";
import AccountDetails from "@/features/seeker/AccountDetails";
import AccountJobApplications from "@/features/seeker/AccountJobApps";
import { getSeeker } from "../api/seeker";

export const MyAccountTabs = [
  {
    id: 1,
    slug: "/",
    url: "/myaccount",
    label: "Account Details",
    component: AccountDetails,
  },
  {
    id: 2,
    slug: "job-applications",
    url: "/myaccount/job-applications",
    label: "Job Applications",
    component: AccountJobApplications,
  },
  {
    id: 3,
    slug: "settings",
    url: "/myaccount/settings",
    label: "Settings",
    component: AccountSettings,
  },
];

const SeekerPanelPage = (props) => {
  return (
    <Account
      title="My Account"
      tabs={MyAccountTabs}
      children={<AccountDetails userData={props.fetchedUser} />}
    />
  );
};

export const getServerSideProps = async ({ req }) => {
  const { uid } = req.headers;

  const userData = await getSeeker(uid);

  return {
    props: {
      fetchedUser: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export default SeekerPanelPage;
