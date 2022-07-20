import "../styles/main.css";
import Layout from "../components/layout/Layout";
// import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <Head>
        <meta name="keywords" content="HTML, blog, javascript, nextjs" />
        <meta name="author" content="John Doe" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
