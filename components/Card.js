import classes from "./Card.module.css";

const Card = ({ header, footer, children, className }) => {
  const cardClasses = `${classes.card} ${className || ""}`;

  return (
    <div className={cardClasses}>
      {header && <div className={classes.header}>{header}</div>}
      <div className={classes.body}>{children}</div>
      {footer && <div className={classes.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
