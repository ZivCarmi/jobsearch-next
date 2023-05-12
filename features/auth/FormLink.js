import Link from "next/link";

import classes from "./FormLink.module.css";

const FormLink = ({ label, link }) => {
  return (
    <div className={classes.link}>
      <span>{label}</span> <Link href={link.url}>{link.title}</Link>
    </div>
  );
};

export default FormLink;
