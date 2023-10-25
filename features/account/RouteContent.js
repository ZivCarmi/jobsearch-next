import Pagination from "@/components/Pagination";

import classes from "./RouteContent.module.css";

const DataRoute = ({ data, fallback, description, children }) => {
  const haveJobApps = data?.totalCount > 0;

  if (!haveJobApps) {
    return fallback;
  }

  return (
    <>
      {description && <div className={classes.description}>{description}</div>}
      {children}
      {data?.pagination?.pagesCount && (
        <Pagination pagesCount={data.pagination.pagesCount} />
      )}
    </>
  );
};

export default DataRoute;
