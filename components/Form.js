import classes from "./Form.module.css";

const Form = (props) => {
  const formClasses = `${classes.form} ${props.className || ""}`;

  return (
    <form className={formClasses} {...props}>
      {props.children}
    </form>
  );
};

export default Form;
