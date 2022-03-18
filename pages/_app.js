import "../styles/globals.css";
import Layout from "../components/layout";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");

  async function getUser() {
    const result = await axios.get("/api/user/getCurrentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(result.data.user);
  }

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Head>
        <title>Peps</title>
        <meta name="description" content="Peps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
