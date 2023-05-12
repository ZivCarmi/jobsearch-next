import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Section from "@/components/Section";
import SeekerCompleteForm from "@/features/seeker/SeekerCompleteForm";
import EmployerCompleteForm from "@/features/employer/EmployerCompleteForm";
import {
  availableCompanySize,
  availableCountries,
} from "@/server/utils/services";

const CompleteRegistration = (props) => {
  const userType = useSelector((state) => state.auth.user?.type);
  const isNewUser = useSelector((state) => state.auth.isNewUser);
  const router = useRouter();

  useEffect(() => {
    if (!isNewUser) router.replace("/");
  }, [isNewUser]);

  return (
    <Section>
      {userType === "employer" && (
        <EmployerCompleteForm
          countries={props.countries}
          companySizes={props.companySizes}
        />
      )}
      {userType === "seeker" && <SeekerCompleteForm />}
    </Section>
  );
};

CompleteRegistration.getLayout = (page) => page;

export const getServerSideProps = async (context) => {
  const { utype } = context.req.headers;
  const data = {
    props: {},
  };

  if (utype !== "employer") return data;

  const countries = Object.keys(availableCountries).map((key) => {
    return { value: key, label: availableCountries[key] };
  });
  const companySizes = Object.keys(availableCompanySize).map((key) => {
    return { value: key, label: availableCompanySize[key] };
  });

  data.props.countries = countries;
  data.props.companySizes = companySizes;

  return data;
};

export default CompleteRegistration;
