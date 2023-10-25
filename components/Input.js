import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

import classes from "./Input.module.css";

const Input = (props) => {
  let input = (
    <>
      {props?.label && <Label htmlFor={props.input.id}>{props.label}</Label>}
      <input type="text" {...props.input} />
    </>
  );

  if (props.reversed) {
    input = (
      <>
        <input type="text" {...props.input} />
        {props?.label && <Label htmlFor={props.input.id}>{props.label}</Label>}
      </>
    );
  }

  const inputClasses = `${classes.input} ${props.className || ""}`;

  return (
    <div className={inputClasses}>
      {input}
      {props.children}
      <ErrorMessage errors={props.errorMsg || props.error} />
    </div>
  );
};

export default Input;
