import Link from "next/link";

import classes from "./AppLink.module.css";

const AppLink = (props) => {
  const icon = props?.asIcon;
  const linkClasses = `${classes.link} ${props.className || ""}`;

  return (
    <>
      <Link {...props} legacyBehavior>
        <a className={linkClasses}>{props.children}</a>
      </Link>
      <style jsx>{`
        a {
          display: ${icon ? "flex" : "block"};
          border-radius: ${icon ? "50px" : "4px"};
          ${!icon ? "padding: 0.6rem 1rem" : ""};
          ${icon ? "justify-content: center;" : ""}
          ${icon ? "align-items: center;" : ""}
          width: ${icon ? props.width || "32px" : ""};
          height: ${icon ? props.height || "32px" : ""};
        }
      `}</style>
    </>
  );
};

export default AppLink;
