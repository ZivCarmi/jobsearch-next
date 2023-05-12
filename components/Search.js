import { useCallback, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
// import { Form, useSubmit } from "react-router-dom";

import AutoComplete from "./AutoComplete";

import classes from "./Search.module.css";

const Search = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [errorTriggered, setErrorTriggered] = useState(false);
  const jobInputRef = useRef();
  const locationInputRef = useRef();

  // const submitHandler = useCallback(
  //   (e) => {
  //     console.log(e.target.job.value);
  //     e.preventDefault();

  //     const jobValue = jobInputRef.current.value;
  //     const locationValue = locationInputRef.current.value;

  //     if (jobValue === "" && locationValue === "") {
  //       e.preventDefault();
  //       setErrorMsg("Enter a job or location to search");
  //       setErrorTriggered(true);
  //       setTimeout(() => {
  //         setErrorTriggered(false);
  //       }, 750);
  //       return;
  //     }
  //   },
  //   [jobInputRef.current?.value, locationInputRef.current?.value]
  // );
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(e.target.job);
  };

  const errorClasses = `${classes.error} ${
    errorTriggered ? classes.shake : ""
  }`;

  return (
    <form
      action="/jobs/search"
      className={classes.searchForm}
      onSubmit={submitHandler}
    >
      <div className={classes.controlGroup}>
        <AutoComplete
          input={{
            name: "job",
            placeholder: "Search by jobs or companies",
          }}
          requestUrl="/api/jobs/search-form"
          setErrorMsg={setErrorMsg}
          ref={jobInputRef}
        />
        <AutoComplete
          input={{
            name: "where",
            placeholder: "Enter location",
          }}
          requestUrl="/api/jobs/search-form"
          setErrorMsg={setErrorMsg}
          ref={locationInputRef}
        />
      </div>
      <button className={classes.searchBtn}>
        <BiSearchAlt2 size="32px" />
      </button>
      {errorMsg && <div className={errorClasses}>{errorMsg}</div>}
    </form>
  );
};

export default Search;
