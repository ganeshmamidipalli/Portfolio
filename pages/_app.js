import "../styles/globals.css";
import Layout from "../components/Layout.js";

function MyApp({ Component, pageProps }) {
  return (
    <div className="applayout">
      <div className="appframe">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </div>
  );
}

export default MyApp;
