import Account from "@/features/account/Account";
import AccountSettings from "@/features/account/AccountSettings";
import AccountDetails from "@/features/employer/AccountDetails";
import AccountJobs from "@/features/employer/AccountJobs";
import AccountJobApps from "@/features/employer/AccountJobApps";
import connectDb from "@/server/utils/connectDb";
import Employers from "@/models/Employer";
import {
  availableCountries,
  availableCompanySize,
} from "@/server/utils/services";
import { formatSelectOptions } from "@/client/utils/services";

export const ManagePanelTabs = [
  {
    id: 1,
    slug: "/",
    url: "/managepanel",
    label: "Account Details",
    component: AccountDetails,
  },
  {
    id: 2,
    slug: "jobs",
    url: "/managepanel/jobs",
    label: "My Jobs",
    component: AccountJobs,
  },
  {
    id: 3,
    slug: "job-applications",
    url: "/managepanel/job-applications",
    label: "Job Applications",
    component: AccountJobApps,
  },
  {
    id: 4,
    slug: "settings",
    url: "/managepanel/settings",
    label: "Settings",
    component: AccountSettings,
  },
];

const EmployerPanelPage = (props) => {
  return (
    <Account
      title="Manage Panel"
      tabs={ManagePanelTabs}
      children={
        <AccountDetails
          userData={props.fetchedUser}
          countries={props.countries}
          companySizes={props.companySizes}
        />
      }
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

  const countries = formatSelectOptions(availableCountries);
  const companySizes = formatSelectOptions(availableCompanySize);

  return {
    props: {
      fetchedUser: JSON.parse(JSON.stringify(userData)),
      countries,
      companySizes,
    },
  };
};

export default EmployerPanelPage;
