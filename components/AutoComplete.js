import { forwardRef, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";

import classes from "./AutoComplete.module.css";

const AutoComplete = forwardRef((props, ref) => {
  // const [value, setValue] = useState("test");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    console.log(value);
    setSelectedValue(value);
  };

  const sendRequest = async (value) => {
    try {
      const results = [];

      const response = await fetch(
        `${props.requestUrl}/?${props.input.name}=${value}`
      );

      if (!response.ok) return;

      const responseJson = await response.json();

      responseJson.data.map((value) => {
        return results.push({ value: value._id, label: value._id });
      });

      return results;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AsyncCreatableSelect
      instanceId={props.input.name}
      tabSelectsValue={false}
      cacheOptions
      allowCreateWhileLoading
      // inputValue={value}
      value={selectedValue}
      loadOptions={sendRequest}
      onChange={handleChange}
      // onInputChange={(value) => setValue(value)}
      // noOptionsMessage={() => null}
      openMenuOnClick={false}
      components={{ IndicatorSeparator: null, DropdownIndicator: null }}
      styles={{
        option: (baseStyles, { isFocused, isSelected }) => ({
          ...baseStyles,
          color: isSelected
            ? "#F5F5F5"
            : isFocused
            ? "var(--purple)"
            : "initial",
          padding: "1rem",
          fontFamily: "inherit",
          fontSize: "1rem",
          backgroundColor:
            isFocused && !isSelected
              ? "var(--purple-3rd)"
              : isSelected
              ? "var(--purple-2nd)"
              : "initial",
        }),
        container: (baseStyles) => ({
          ...baseStyles,
          fontSize: "1.2rem",
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          padding: 0,
          margin: 0,
        }),
        control: (baseStyles, { isFocused }) => ({
          ...baseStyles,
          minHeight: "3rem",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
          cursor: "text",
          backgroundColor: isFocused ? "var(--purple-3rd)" : "white",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          margin: 0,
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: "0 1rem",
        }),
      }}
      {...props.input}
    />
  );
});

export default AutoComplete;
