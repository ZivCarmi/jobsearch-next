import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import classes from "./Input.module.css";
import { cn } from "@/client/utils";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      reversed,
      children,
      errorMsg,
      error,
      input,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputEl = (
      <input
        type="text"
        className={cn(
          "block w-full border text-black border-slate-200 rounded-md px-3 py-2",
          className
        )}
        {...input}
        {...props}
        ref={ref}
      />
    );
    let inputContainer = (
      <>
        {label && <Label htmlFor={input.id}>{label}</Label>}
        {inputEl}
      </>
    );

    if (reversed) {
      inputContainer = (
        <>
          {inputEl}
          {label && <Label htmlFor={input.id}>{label}</Label>}
        </>
      );
    }

    return (
      <div className={cn(classes.input, className)}>
        {inputContainer}
        {children}
        <ErrorMessage errors={errorMsg || error} />
      </div>
    );
  }
);

export default Input;
