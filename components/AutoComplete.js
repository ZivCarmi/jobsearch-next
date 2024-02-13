import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Spinner2 from "./Spinner2";
import Input from "./Input";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const AutoComplete = ({
  input: { name, ...inputProps },
  register,
  setValue,
  clearErrors,
  requestUrl,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { data, error, isLoading } = useSWR(
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
  }, []);

  return (
    <Input
      {...inputProps}
      className="h-full text-lg border-none outline-none focus:bg-[var(--purple-3rd)]"
      {...register(name, { onChange: inputHandler })}
      onClick={() => setIsOptionsOpen(true)}
    >
      {isLoading && (
        <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2">
          <Spinner2 className="w-4 h-4 border-black" />
        </div>
      )}
      {error && <p>Failed to fetch...</p>}
      {data && isOptionsOpen && (
        <div
          className="absolute top-[calc(100%-3px)] left-0 right-0 bg-white rounded-bl-md rounded-br-md shadow-md overflow-x-clip"
          ref={optionsRef}
        >
          <ul>
            {data.map((option) => (
              <li key={option._id}>
                <button
                  type="button"
                  className="bg-transparent border-none px-4 py-2 w-full text-left text-black text-base hover:bg-[var(--purple-3rd)] hover:text-[var(--purple)]"
                  onClick={() => optionHandler(option._id)}
                >
                  {option._id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Input>
  );
};

export default AutoComplete;
