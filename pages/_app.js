import "../styles/main.css";
import Layout from "../components/layout/Layout";
import DimmerContextProvider from "../store/dimmer-context";
import MediaQueryContextProvider from "../store/media-query-context";
// import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <MediaQueryContextProvider>
      <DimmerContextProvider>
        <Layout>
          {/* <Head>
        <meta name="keywords" content="HTML, blog, javascript, nextjs" />
        <meta name="author" content="John Doe" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
          <Component {...pageProps} />
        </Layout>
      </DimmerContextProvider>
    </MediaQueryContextProvider>
  );
}

export default MyApp;
