import classes from "./Section.module.css";

const Section = ({ fluid, children, className }) => {
  const sectionClasses = `${fluid ? "" : classes.section} ${className || ""}`;

  return <section className={sectionClasses}>{children}</section>;
};

export default Section;
