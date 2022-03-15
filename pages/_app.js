import '../styles/globals.css'
import Layout from '../components/layout';
import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }) {
  console.log("token");
  console.log(Cookies.get("token"))

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
