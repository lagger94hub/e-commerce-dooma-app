import "../styles/main.css";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Layout from "../components/layout/Layout";
import DimmerContextProvider from "../store/dimmer-context";
import MediaQueryContextProvider from "../store/media-query-context";
import NavCategoriesContextProvider from "../store/nav-categories-context";
import SettingsContextProvider from "../store/settings-context";
import CartContextProvider from "../store/cart-context";
// import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <MediaQueryContextProvider>
      <DimmerContextProvider>
        <SettingsContextProvider>
          <NavCategoriesContextProvider>
            <CartContextProvider>
              <Layout>
                {/* 
                <Head>
                  <meta name="keywords" content="HTML, blog, javascript, nextjs" />
                  <meta name="author" content="John Doe" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head> 
                */}
                <Component {...pageProps} />
              </Layout>
            </CartContextProvider>
          </NavCategoriesContextProvider>
        </SettingsContextProvider>
      </DimmerContextProvider>
    </MediaQueryContextProvider>
  );
}

export default MyApp;
