import { Overlay } from "./Modal";

import classes from "./Spinner.module.css";

const Spinner = ({ text, withOverlay, withOverlayAsBackground, dark }) => {
  const overlayClasses = classes.overlay;

  const wrapperClasses = `${classes.wrapper} ${
    text ? classes.spinnerWrapper : ""
  }`;

  const loaderClasses = `${classes.loader} ${text ? classes.withText : ""} ${
    withOverlay ? classes.withOverlay : ""
  } ${dark ? classes.dark : ""}`;

  const loaderJSX = (
    <div className={wrapperClasses}>
      <span className={loaderClasses}></span>
      {text && <p>{text}</p>}
    </div>
  );

  return withOverlay ? (
    <Overlay className={overlayClasses}>{loaderJSX}</Overlay>
  ) : withOverlayAsBackground ? (
    <Overlay
      className={overlayClasses}
      roundedBy={withOverlayAsBackground.roundedBy}
      asBackground
    >
      {loaderJSX}
    </Overlay>
  ) : (
    loaderJSX
  );
};

export default Spinner;
