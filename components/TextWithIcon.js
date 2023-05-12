import classes from "./TextWithIcon.module.css";

const TextWithIcon = ({ icon, text }) => {
  return (
    <div className={classes.twi}>
      {icon}
      {text}
    </div>
  );
};

export default TextWithIcon;
