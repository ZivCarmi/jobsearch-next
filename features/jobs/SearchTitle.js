import { Fragment } from "react";
import { useSearchParams } from "react-router-dom";

const SearchTitle = () => {
  const [searchedParams] = useSearchParams();

  const params = {
    job: searchedParams.get("job"),
    where: searchedParams.get("where"),
  };

  let title = [<Fragment key="search">Search results for</Fragment>];

  title.push(
    <Fragment key="jobs">
      {params?.job && <span> {params.job}</span>}
      &nbsp;jobs
    </Fragment>
  );

  if (params.hasOwnProperty("where")) {
    title.push(
      <Fragment key="where">
        {params?.where && (
          <>
            &nbsp;in<span> {params.where}</span>
          </>
        )}
      </Fragment>
    );
  }

  return <h1>{title}</h1>;
};

export default SearchTitle;
