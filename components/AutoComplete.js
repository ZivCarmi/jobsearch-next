import { useEffect, useRef, useState } from "react";

import classes from "./AutoComplete.module.css";
import { useRouter } from "next/router";

const AutoComplete = ({
  input: { name, ...inputProps },
  register,
  setValue,
  clearErrors,
  requestUrl,
}) => {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsRef = useRef(null);

  const sendRequest = async (value) => {
    if (!value) {
      return setOptions([]);
    }

    try {
      console.log(router);

      const response = await fetch(`${requestUrl}?${name}=${value}`);

      console.log(`${requestUrl}/?${name}=${value}`);

      if (!response.ok) return;

      console.log(`passed response.ok`);

      const responseJson = await response.json();

      setOptions(responseJson);
      setIsOptionsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const inputHandler = (e) => {
    clearErrors();
    sendRequest(e.target.value);
  };

  const optionHandler = (option) => {
    setValue(name, option);
    setIsOptionsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOptionsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <div className={classes.wrapper}>
      <input
        type="text"
        className={classes.input}
        {...inputProps}
        {...register(name, { onChange: inputHandler })}
      />
      {options && isOptionsOpen && (
        <div className={classes.autoComplete} ref={optionsRef}>
          <ul>
            {options.map((option) => (
              <li key={option._id} className={classes.optionItem}>
                <button type="button" onClick={() => optionHandler(option._id)}>
                  {option._id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
