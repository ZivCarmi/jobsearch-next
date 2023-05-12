import moment from "moment";
import { BiTimeFive } from "react-icons/bi";

import classes from "./JobDate.module.css";

const JobDate = ({ icon = <BiTimeFive />, text, date, className }) => {
  const dateClasses = `${classes.date} ${className || ""}`;

  return (
    <time className={dateClasses}>
      {icon}
      {text}
      {moment(date).fromNow()}
    </time>
  );
};
export default JobDate;
