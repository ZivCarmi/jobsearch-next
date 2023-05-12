import classes from "./Fieldset.module.css";

const Fieldset = (props) => {
  return (
    <fieldset className={classes.fieldset}>
      <legend>{props.label}</legend>
      {props.children}
    </fieldset>
  );
};

export default Fieldset;
