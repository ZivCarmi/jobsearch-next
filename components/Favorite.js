import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

import classes from "./Favorite.module.css";
import { setCookie } from "cookies-next";

const outlineHeart = <AiOutlineHeart color="var(--purple-2nd)" size="1.5rem" />;
const fillHeart = <AiFillHeart color="var(--purple-2nd)" size="1.5rem" />;

const Favorite = ({ jobId }) => {
  const token = useSelector((state) => state.auth.token);
  const [isFavored, setIsFavored] = useState(false);
  const [icon, setIcon] = useState(outlineHeart);

  const mouseEnterHandler = () => {
    setIcon(isFavored ? outlineHeart : fillHeart);
  };

  const mouseLeaveHandler = () => {
    setIcon(isFavored ? fillHeart : outlineHeart);
  };

  const favoriteHandler = async () => {
    if (!token) {
      const storagedFavorites = localStorage.getItem("favorites");
      const favorites = JSON.parse(storagedFavorites);

      if (!favorites) {
        setIcon(fillHeart);
        setIsFavored(true);
        return localStorage.setItem("favorites", JSON.stringify([jobId]));
      }

      const foundFavorite = favorites.find((favor) => favor === jobId);

      if (!foundFavorite) {
        favorites.unshift(jobId);

        setIcon(fillHeart);
        setIsFavored(true);
        return localStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        const updatedFavorites = favorites.filter((favor) => favor !== jobId);

        setIcon(outlineHeart);
        setIsFavored(false);
        return localStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      }
    }
  };

  useEffect(() => {
    const storagedFavorites = localStorage.getItem("favorites");
    const favorites = JSON.parse(storagedFavorites);

    if (!favorites) return;

    const foundFavorite = favorites.find((favor) => favor === jobId);

    if (!foundFavorite) return;

    setIcon(fillHeart);
    setIsFavored(true);
  }, []);

  return (
    <button
      type="button"
      className={classes.favorite}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={favoriteHandler}
    >
      {icon}
    </button>
  );
};

export default Favorite;
