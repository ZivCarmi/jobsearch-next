import { useSelector } from "react-redux";
import { BiUserCheck, BiUserX } from "react-icons/bi";

import TabCard from "./TabCard";
import TabSection from "./TabSection";

import classes from "./AccountSettings.module.css";
import moment from "moment";

const AccountSettings = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <TabCard title="Account Settings">
      <TabSection title="Account Information">
        <table className={classes.table}>
          <tbody>
            <tr>
              <th>Account verified</th>
              <td>
                {user?.verified ? (
                  <BiUserCheck size={"2rem"} color="hsl(120deg 50% 50%)" />
                ) : (
                  <BiUserX size={"2rem"} color="hsl(0deg 50% 50%)" />
                )}
              </td>
            </tr>
            <tr className={classes.type}>
              <th>Account type</th>
              <td>{user?.type}</td>
            </tr>
            <tr className={classes.type}>
              <th>Creation date</th>
              <td>{moment(user?.createdAt).format("DD/MM/YY")}</td>
            </tr>
          </tbody>
        </table>
      </TabSection>
    </TabCard>
  );
};

export default AccountSettings;
