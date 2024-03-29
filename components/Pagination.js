import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import classes from "./Pagination.module.css";

const Pagination = ({ pagesCount }) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1;
  const [basePath, setBasePath] = useState(undefined);

  useEffect(() => {
    setBasePath(window.location.pathname);
  }, []);

  if (pagesCount <= 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  if (!basePath) return null;

  return (
    <div>
      <ul className={classes.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            className={`${classes.pageItem} ${
              page === currentPage ? classes.pageActive : ""
            }`}
          >
            <Link
              href={`${basePath}?page=${page}`}
              className={classes.pageLink}
              scroll={false}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Pagination);
