import classes from "./TabCard.module.css";

const TabCard = ({ title, children }) => {
  return (
    <div className={classes.card}>
      {title && <h2 className={classes.title}>{title}</h2>}
      {children}
    </div>
  );
};

export default TabCard;
