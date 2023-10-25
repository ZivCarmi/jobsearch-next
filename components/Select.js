import { useEffect, useState } from "react";
import ReactSelect from "react-select";

import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

import classes from "./Select.module.css";

const Select = ({ label, select, error, errorMsg }) => {
  const [selectProps, setSelectProps] = useState(select);

  useEffect(() => {
    setSelectProps((previousSelect) => {
      const { value, ...rest } = previousSelect;

      return {
        ...rest,
        defaultValue: value,
      };
    });
  }, []);

  return (
    <div className={classes.select}>
      {label && <Label htmlFor={select.id}>{label}</Label>}
      <ReactSelect
        instanceId={select.id}
        className={classes.reactSelect}
        openMenuOnFocus={true}
        closeMenuOnSelect={selectProps.isMulti ? false : true}
        {...selectProps}
      />
      {error && <ErrorMessage errors={errorMsg || error} />}
    </div>
  );
};

export default Select;
