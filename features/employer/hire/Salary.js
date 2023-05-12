import Input from "@/components/Input";
import Select from "@/components/Select";
import Label from "@/components/Label";
import ErrorMessage from "@/components/ErrorMessage";

import classes from "./Salary.module.css";

const Salary = ({ data }) => {
  const { from, to, type } = data;

  const fromInputClasses = `${classes.inputWrapper} ${
    from.isError ? classes.inputError : ""
  }`;
  const toInputClasses = `${classes.inputWrapper} ${
    to.isError ? classes.inputError : ""
  }`;

  return (
    <div>
      <div className={classes.salary}>
        <div className={classes.container}>
          <Label htmlFor="salaryFrom">Salary</Label>
          <div className={classes.controlGroup}>
            <label>
              <div className={classes.label}>FROM</div>
              <div className={fromInputClasses}>
                <span>$</span>
                <Input
                  input={{
                    type: "number",
                    id: "salaryFrom",
                    ...from.attributes,
                  }}
                />
              </div>
            </label>
            <label>
              <div className={classes.label}>TO</div>
              <div className={toInputClasses}>
                <span>$</span>
                <Input
                  input={{
                    type: "number",
                    id: "salaryTo",
                    ...to.attributes,
                  }}
                />
              </div>
            </label>
          </div>
        </div>
        <Select
          select={{
            id: "salaryType",
            placeholder: "Choose salary type...",
            ...type.attributes,
          }}
        />
      </div>
      <ErrorMessage>{data.from.isError}</ErrorMessage>
      <ErrorMessage>{data.to.isError}</ErrorMessage>
      <ErrorMessage>{data.type.isError}</ErrorMessage>
    </div>
  );
};
export default Salary;
