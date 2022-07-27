import "../styles/main.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Layout from "../components/layout/Layout";
import DimmerContextProvider from "../store/dimmer-context";
import MediaQueryContextProvider from "../store/media-query-context";
import CategoriesContextProvider from "../store/categories-context";
import SettingsContextProvider from "../store/settings-context";
// import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <MediaQueryContextProvider>
      <DimmerContextProvider>
        <SettingsContextProvider>
          <CategoriesContextProvider>
            <Layout>
              {/* <Head>
        <meta name="keywords" content="HTML, blog, javascript, nextjs" />
        <meta name="author" content="John Doe" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
              <Component {...pageProps} />
            </Layout>
          </CategoriesContextProvider>
        </SettingsContextProvider>
      </DimmerContextProvider>
    </MediaQueryContextProvider>
  );
}

export default MyApp;
