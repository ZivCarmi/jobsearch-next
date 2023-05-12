import classes from "./TabSection.module.css";

const TabSection = (props) => {
  return (
    <div className={classes.tabSection}>
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
};

export default TabSection;
