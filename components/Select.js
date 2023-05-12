import { useCallback, useEffect, useState } from "react";
import ReactSelect from "react-select";

import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

import classes from "./Select.module.css";

const Select = ({ label, select, error, errorMsg }) => {
  const [selectProps, setSelectProps] = useState(select);
  const { options, isMulti, value } = selectProps;

  // const getDefaultValue = useCallback(() => {
  //   if (!value) return null;

  //   if (!isMulti) {
  //     return options.find((option) => option.value === value);
  //   }

  //   return options.filter((option) => value.includes(option.value));
  // }, []);

  useEffect(() => {
    // const defaultValues = getDefaultValue();

    // if (!defaultValues) return;

    setSelectProps((previousSelect) => {
      const { value, ...rest } = previousSelect;

      return {
        ...rest,
        defaultValue: value,
      };
    });
  }, []);

  // if (value?.length > 0) return null;

  return (
    <div className={classes.select}>
      {label && <Label htmlFor={select.id}>{label}</Label>}
      <ReactSelect
        {...selectProps}
        instanceId={select.id}
        className={classes.reactSelect}
        openMenuOnFocus={true}
        closeMenuOnSelect={isMulti ? false : true}
      />
      {error && <ErrorMessage>{errorMsg || error}</ErrorMessage>}
    </div>
  );
};

export default Select;
