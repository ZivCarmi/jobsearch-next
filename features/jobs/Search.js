import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { BiSearchAlt2 } from "react-icons/bi";

import AutoComplete from "../../components/AutoComplete";

import classes from "./Search.module.css";

const Search = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    clearErrors,
  } = useForm();

  const submitHandler = (data) => {
    if (!data.title && !data.location) {
      setError(
        "title",
        {
          type: "global",
          message: "Enter a job or location to search",
        },
        { shouldFocus: true }
      );
      setTimeout(() => {
        clearErrors();
      }, 5000);
      return;
    }

    const searchParams = {};

    for (const param in data) {
      if (data[param]) {
        searchParams[param] = data[param];
      }
    }

    router.push(`/search/jobs?${new URLSearchParams(searchParams)}`);
  };

  const errorClasses = `${classes.error} ${errors.title ? classes.shake : ""}`;

  return (
    <form
      className={classes.searchForm}
      autoComplete="off"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={classes.controlGroup}>
        <AutoComplete
          requestUrl="/api/search/jobs-board"
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          input={{
            name: "title",
            placeholder: "Search by jobs or companies",
          }}
        />
        <AutoComplete
          requestUrl="/api/search/jobs-board"
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          input={{
            name: "location",
            placeholder: "Enter location",
          }}
        />
      </div>
      <button className={classes.searchBtn}>
        <BiSearchAlt2 size="32px" />
      </button>
      {errors.title && (
        <div className={errorClasses}>{errors.title?.message}</div>
      )}
    </form>
  );
};

export default Search;
