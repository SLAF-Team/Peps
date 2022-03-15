import "../styles/globals.css";
import Layout from "../components/layout";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userAtom } from "../lib/store";
import { useEffect } from "react";
import axios from "axios";
import { Provider } from "jotai";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useAtom(userAtom);
  const token = Cookies.get("token");

  console.log("token");
  console.log(token);

  async function getUser() {
    const result = await axios.get("/api/user/getCurrentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(result.data.user);
  }

  useEffect(() => {
    getUser();
  }, [token]);

  console.log("user from app");
  console.log(user);

  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
