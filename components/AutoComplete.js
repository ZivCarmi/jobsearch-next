import { useEffect, useRef, useState } from "react";
import classes from "./AutoComplete.module.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const AutoComplete = ({
  input: { name, ...inputProps },
  register,
  setValue,
  clearErrors,
  requestUrl,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { data, error } = useSWR(
    inputValue ? `${requestUrl}?${name}=${inputValue}` : null,
    fetcher
  );
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  const optionsRef = useRef(null);

  const inputHandler = (e) => {
    clearErrors();
    setInputValue(e.target.value);
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
        onClick={() => setIsOptionsOpen(true)}
      />
      {error && <p>Failed to fetch...</p>}
      {data && isOptionsOpen && (
        <div className={classes.autoComplete} ref={optionsRef}>
          <ul>
            {data.map((option) => (
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
