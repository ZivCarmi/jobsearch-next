import classes from "./FormErrors.module.css";

const FormErrors = ({ errors, className }) => {
  const errorClasses = `${classes.errors} ${className || ""}`;
  let content;

  if (typeof errors === "object") {
    if (Object.keys(errors).length === 0) return null;

    content = (
      <ul>
        {Object.values(errors).map((err) => (
          <li key={err}>{err}</li>
        ))}
      </ul>
    );
  } else if (typeof errors === "string") {
    if (!errors) return null;

    content = errors;
  } else {
    return null;
  }

  return <div className={errorClasses}>{content}</div>;
};

export default FormErrors;
