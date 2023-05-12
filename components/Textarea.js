import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

import classes from "./Textarea.module.css";

const Textarea = (props) => {
  return (
    <div className={classes.textarea}>
      {props.label && <Label htmlFor={props.textarea.id}>{props.label}</Label>}
      <textarea {...props.textarea} />
      <ErrorMessage>{props.errorMsg || props.error}</ErrorMessage>
    </div>
  );
};

export default Textarea;
