import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import classes from "./Favorite.module.css";

const OutlineHeart = <AiOutlineHeart color="var(--purple-2nd)" size="1.5rem" />;
const FillHeart = <AiFillHeart color="var(--purple-2nd)" size="1.5rem" />;

const Favorite = () => {
  const [icon, setIcon] = useState(OutlineHeart);

  const mouseEnterHandler = () => {
    setIcon(FillHeart);
  };

  const mouseLeaveHandler = () => {
    setIcon(OutlineHeart);
  };

  return (
    <button
      type="button"
      className={classes.favorite}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {icon}
    </button>
  );
};

export default Favorite;
