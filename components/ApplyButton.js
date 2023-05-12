import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

import classes from "./ApplyButton.module.css";

const ApplyButton = ({ link, withIcon, className, text = "Apply" }) => {
  const applyBtnClasses = `${classes.apply} ${className || ""}`;

  return (
    <Link className={applyBtnClasses} {...link}>
      {withIcon && <FaArrowAltCircleRight />} {text}
    </Link>
  );
};

export default ApplyButton;
