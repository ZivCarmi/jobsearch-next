import { useState } from "react";
import ReactSlider from "react-slider";

import classes from "./Slider.module.css";

const Slider = ({ min = 0, max = 10_000, defaultValue }) => {
  const defaultSlider = defaultValue || [min, max];
  const [values, setValues] = useState(defaultSlider);

  const Track = (props, state) => (
    <div {...props} className={classes.track} index={state.index}></div>
  );

  const Thumb = (props, state) => (
    <div {...props} className={classes.thumb}></div>
  );

  const handleChange = (newValues) => setValues(newValues);

  const manualValueHandler = (e) => {
    let { name, value } = e.target;
    value = parseInt(value);

    if (name === "minSliderValue") {
      if (!value) value = min;
      setValues((prevValues) => {
        const previousMax = prevValues[1];
        if (value > previousMax) value = previousMax;

        return [value, previousMax];
      });
    }

    if (name === "maxSliderValue") {
      if (!value || value > max) {
        setValues((prevValues) => [prevValues[0], max]);
        return;
      }

      setValues((prevValues) => {
        let previousMin = prevValues[0];
        if (value < previousMin) previousMin = value;

        return [previousMin, value];
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sliderOutput}>
        {values[0] === values[1] ? (
          <span>${values[0]}</span>
        ) : (
          <>
            <span>${values[0]}</span>
            <span>—</span>
            <span>${values[1]}</span>
          </>
        )}
      </div>
      <ReactSlider
        className={classes.slider}
        value={values}
        renderTrack={Track}
        renderThumb={Thumb}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <div className={classes.values}>
        <input
          className={classes.inputs}
          id="minValue"
          type="number"
          name="minSliderValue"
          value={values[0]}
          onChange={manualValueHandler}
        />
        <input
          className={classes.inputs}
          id="maxValue"
          type="number"
          name="maxSliderValue"
          value={values[1]}
          onChange={manualValueHandler}
        />
      </div>
    </div>
  );
};

export default Slider;
