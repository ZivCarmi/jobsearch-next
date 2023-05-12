import { useState } from "react";

const useInput = (validationFn, isRequired = true, defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = isRequired
    ? validationFn(value)
    : value !== ""
    ? validationFn(value)
    : true;
  const isError = isRequired ? !isValid && isTouched : value !== "" && !isValid;

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return [
    isValid,
    isError,
    {
      value,
      onBlur: blurHandler,
      onChange: changeHandler,
    },
    reset,
  ];
};

export default useInput;
