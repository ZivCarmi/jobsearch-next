import { useState } from "react";

const useSelect = (validationFn, isRequired = true, defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = isRequired
    ? validationFn(value)
    : value !== ""
    ? validationFn(value)
    : true;
  const isError = isRequired ? !isValid && isTouched : value !== "" && !isValid;

  const changeHandler = (e) => {
    // for multi select
    if (Array.isArray(e)) {
      const values = [];

      e.map((option) => values.push(option.value));

      setValue(values);
    } else {
      setValue(e.value);
    }
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
      defaultValue: value,
      onBlur: blurHandler,
      onChange: changeHandler,
    },
    reset,
  ];
};

export default useSelect;
