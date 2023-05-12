import classes from "./FormCard.module.css";

const FormCard = (props) => {
  const cardClasses = `${classes.card} ${props.className || ""}`;

  return (
    <div className={cardClasses}>
      {props.heading && props.heading}
      {props.title && <h1>{props.title}</h1>}
      {props.children}
    </div>
  );
};

export default FormCard;
