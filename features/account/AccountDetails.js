import { useSelector } from "react-redux";

import Form from "@/components/Form";
import Input from "../../components/Input";
import TabCard from "../account/TabCard";
import TabSection from "../account/TabSection";

import classes from "../account/AccountDetails.module.css";

const AccountDetails = ({ onSave, children }) => {
  const email = useSelector((state) => state.auth.user?.email);

  return (
    <TabCard title="Account Details">
      <Form method="post" className={classes.form} onSubmit={onSave}>
        <div className={classes.group}>
          {children}
          <TabSection title="Email Address">
            <Input
              label="Email Address"
              input={{
                id: "email",
                name: "email",
                type: "email",
                defaultValue: email,
                disabled: true,
              }}
            />
          </TabSection>
        </div>
        <div className={classes.actions}>
          <button type="submit">Save</button>
        </div>
      </Form>
    </TabCard>
  );
};

export default AccountDetails;
