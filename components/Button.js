import Spinner from "./Spinner";

import classes from "./Button.module.css";

const Button = ({
  button,
  children,
  isLoading,
  loadingText = "Saving...",
  buttonType = "primary",
}) => {
  return (
    <>
      <button type="button" className={classes.button} {...button}>
        {isLoading ? <Spinner text={loadingText} /> : children}
      </button>
      <style jsx>{`
        button {
          background-color: var(${"--" + buttonType + "-main"});
        }

        button:hover:enabled {
          background-color: var(${"--" + buttonType + "-hover"});
        }

        button:disabled {
          opacity: 0.5;
          /* background-color: var(${"--" + buttonType + "-disabled"}); */
        }
      `}</style>
    </>
  );
};

export default Button;
