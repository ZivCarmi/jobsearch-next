import { forwardRef } from "react";

import Label from "./Label";

import classes from "./Input.module.css";
import ErrorMessage from "./ErrorMessage";

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

  const inputClasses = `${classes.input} ${classes[props.input.type] || ""}`;

  return (
    <div className={inputClasses}>
      {input}
      {props.children}
      <ErrorMessage>{props.errorMsg || props.error}</ErrorMessage>
    </div>
  );
};

export default Input;
