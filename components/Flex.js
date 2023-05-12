import classes from "./Flex.module.css";

const Flex = (props) => {
  const flexClasses = props.className
    ? `${props.className} ${classes.group}`
    : classes.group;

  return <div className={flexClasses}>{props.children}</div>;
};

export default Flex;
