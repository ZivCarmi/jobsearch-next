import Spinner from "@/components/Spinner";
import Jobs from "@/features/jobs/Jobs";
import { useEffect, useState } from "react";

const limit = 10;

const FavoritesPage = () => {
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState(null);

  const getFavorites = async () => {
    const storagedFavorites = localStorage.getItem("favorites");
    const favorites = JSON.parse(storagedFavorites);

    if (!favorites) return;

    const requestedFavorites = favorites.slice(skip, skip + limit);

    try {
      const response = await fetch(
        `/api/jobs?ids=${requestedFavorites.join(",")}`
      );

      const json = await response.json();

      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  if (!data) return <Spinner withOverlay />;

  return <Jobs jobs={data} />;
};

export default FavoritesPage;
