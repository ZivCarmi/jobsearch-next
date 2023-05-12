import classes from "./PageTitle.module.css";

const PageTitle = ({ title }) => {
  return <h1 className={classes.title}>{title}</h1>;
};
export default PageTitle;
