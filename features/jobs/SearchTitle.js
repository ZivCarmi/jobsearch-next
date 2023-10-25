import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

const SearchTitle = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState(null);
  const params = router.query;
  let title = [<Fragment key="search">Search results for</Fragment>];

  useEffect(() => {
    if (!searchParams) {
      setSearchParams(params);
    }
  }, [params]);

  title.push(
    <Fragment key="title">
      {searchParams?.title && <span> {searchParams?.title}</span>}
      &nbsp;jobs
    </Fragment>
  );

  if (searchParams?.location) {
    title.push(
      <Fragment key="location">
        {searchParams?.location && (
          <>
            &nbsp;in<span> {searchParams?.location}</span>
          </>
        )}
      </Fragment>
    );
  }

  return <h1>{title}</h1>;
};

export default SearchTitle;
