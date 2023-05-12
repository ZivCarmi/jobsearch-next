import classes from "./Grid.module.css";

const Grid = ({ children, tag = "div", className }) => {
  const Tag = tag;
  const tagClassNames = `${classes.group} ${className || ""}`;

  return <Tag className={tagClassNames}>{children}</Tag>;
};

export default Grid;
