import Account from "@/features/account/Account";
import AccountSettings from "@/features/account/AccountSettings";
import AccountDetails from "@/features/employer/AccountDetails";
import AccountJobs from "@/features/employer/AccountJobs";
import AccountJobApps from "@/features/employer/AccountJobApps";
import connectDb from "@/server/utils/connectDb";
import Employers from "@/models/Employer";
import SingleJobAppModal from "@/features/employer/SingleJobAppModal";
import SingleJobModal from "@/features/employer/SingleJobModal";

export const ManagePanelTabs = [
  {
    id: 1,
    slug: "/",
    url: "/managepanel",
    label: "Account Details",
    components: {
      root: AccountDetails,
    },
  },
  {
    id: 2,
    slug: "jobs",
    url: "/managepanel/jobs",
    label: "My Jobs",
    components: {
      root: AccountJobs,
      modal: SingleJobModal,
    },
  },
  {
    id: 3,
    slug: "job-applications",
    url: "/managepanel/job-applications",
    label: "Job Applications",
    components: {
      root: AccountJobApps,
      modal: SingleJobAppModal,
    },
  },
  {
    id: 4,
    slug: "settings",
    url: "/managepanel/settings",
    label: "Settings",
    components: {
      root: AccountSettings,
    },
  },
];

const EmployerPanelPage = (props) => {
  return (
    <Account
      title="Manage Panel"
      tabs={ManagePanelTabs}
      children={<AccountDetails userData={props.fetchedUser} />}
    />
  );
};

export const getServerSideProps = async ({ req }) => {
  const { uid } = req.headers;

  await connectDb();

  const userData = await Employers.findOne(
    { _id: uid },
    "-_id firstName lastName company"
  ).lean({ getters: true });

  return {
    props: {
      fetchedUser: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export default EmployerPanelPage;
