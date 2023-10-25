import Account from "@/features/account/Account";
import AccountSettings from "@/features/account/AccountSettings";
import AccountDetails from "@/features/seeker/AccountDetails";
import AccountJobApplications from "@/features/seeker/AccountJobApps";
import { getSeeker } from "../api/seeker";
import SingleJobAppModal from "@/features/seeker/SingleJobAppModal";
import SingleJobApp from "@/features/seeker/SingleJobApp";

export const MyAccountTabs = [
  {
    id: 1,
    slug: "/",
    url: "/myaccount",
    label: "Account Details",
    components: {
      root: AccountDetails,
    },
  },
  {
    id: 2,
    slug: "job-applications",
    url: "/myaccount/job-applications",
    label: "Job Applications",
    components: {
      root: AccountJobApplications,
      modal: SingleJobAppModal,
      single: SingleJobApp,
    },
  },
  {
    id: 3,
    slug: "settings",
    url: "/myaccount/settings",
    label: "Settings",
    components: {
      root: AccountSettings,
    },
  },
];

const SeekerPanelPage = ({ user }) => {
  return (
    <Account
      title="My Account"
      tabs={MyAccountTabs}
      children={<AccountDetails userData={user} />}
    />
  );
};

export const getServerSideProps = async ({ req }) => {
  const { uid } = req.headers;

  const userData = await getSeeker(uid);

  return {
    props: {
      user: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export default SeekerPanelPage;
