import { MdReportGmailerrorred } from "react-icons/md";

import TextWithIcon from "./TextWithIcon";

import classes from "./ErrorMessage.module.css";

const ErrorMessage = ({ errors }) => {
  let content;

  if (typeof errors === "object") {
    if (Object.keys(errors).length === 0) return null;

    content = (
      <ul>
        {Object.values(errors).map((err) => (
          <li key={err}>
            <TextWithIcon
              icon={<MdReportGmailerrorred size="1.2rem" />}
              text={err}
            />
          </li>
        ))}
      </ul>
    );
  } else if (typeof errors === "string") {
    if (!errors) return null;

    content = (
      <TextWithIcon
        icon={<MdReportGmailerrorred size="1.2rem" />}
        text={errors}
      />
    );
  } else {
    return null;
  }

  return <span className={classes.error}>{content}</span>;
};
export default ErrorMessage;
