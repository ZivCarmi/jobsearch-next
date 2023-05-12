import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

import { RootWrapper } from "@/components/layouts/RootLayout";
import PersistLogin from "@/components/layouts/PersistLogin";
import Spinner from "@/components/Spinner";
import store from "@/store";

import "@/styles/globals.css";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = () => setLoading(true);
  //   const handleComplete = () => setLoading(false);

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // }, []);

  const getLayout = Component.getLayout || RootWrapper;

  return (
    <Provider store={store}>
      <PersistLogin>
        {loading ? (
          <Spinner withOverlay />
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </PersistLogin>
    </Provider>
  );
}

export default App;
