import TextWithIcon from "@/components/TextWithIcon";
import useRandomColor from "../../hooks/useRandomColor";

import classes from "./CompanyIcon.module.css";

const CompanyIcon = ({ company, withName, className }) => {
  // const randomColor = useRandomColor();
  const randomColor = "var(--purple-2nd)";

  const companyFirstLetter = company?.name[0];

  const iconClasses = `${classes.icon} ${className || ""}`;

  return company?.image ? (
    <TextWithIcon
      icon={
        <img
          className={iconClasses}
          src={company?.image}
          alt={`${company?.name} company logo`}
        />
      }
      text={withName && <div>{company?.name}</div>}
    />
  ) : (
    <TextWithIcon
      icon={
        <div
          className={`${iconClasses} ${classes.customIcon}`}
          style={{ backgroundColor: randomColor }}
        >
          {companyFirstLetter}
        </div>
      }
      text={withName && <div>{company?.name}</div>}
    />
  );
};

export default CompanyIcon;
