import classes from "./Label.module.css";

const Label = (props) => {
  const labelClasses = `${classes.label} ${props.className || ""}`;

  return (
    <label className={labelClasses} {...props}>
      {props.children}
    </label>
  );
};

export default Label;
