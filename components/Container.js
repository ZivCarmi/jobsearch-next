import classes from "./Container.module.css";

const Container = ({ children, className, width }) => {
  const containerClasses = className
    ? `${classes.container} ${className}`
    : classes.container;

  return (
    <>
      <div className={containerClasses}>{children}</div>
      <style jsx>{`
        div {
          max-width: ${width ? width : "1500px"};
        }
      `}</style>
    </>
  );
};

export default Container;
