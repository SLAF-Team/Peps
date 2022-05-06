import "../styles/globals.css";
import Layout from "../components/layout/index";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Head from "next/head";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Button } from "@mantine/core";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

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
    <MantineProvider
      theme={{
        colors: {
          cookogsyellow: [
            "#FFD12F",
            "#FFD12F",
            "#FFD12F",
            "#FFD12F",
            "#FFD12F",
            "#FFD12F",
            "#FFD12F",
            "#FFD12F",
            "#FFD12F",
            "#FFD12F",
          ],
          cookogsblue: [
            "#17203C",
            "#17203C",
            "#17203C",
            "#17203C",
            "#17203C",
            "#17203C",
            "#17203C",
            "#17203C",
            "#17203C",
            "#17203C",
          ],
        },
        primaryColor: "cookogsblue",
      }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <NotificationsProvider>
          <Head>
            <title>Peps</title>
            <meta name="description" content="Peps" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />

            <meta property="og:title" content="Peps, damn that's tasty" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://peps.life" />
            <meta
              property="og:image"
              content="https://peps.life/_next/static/media/peps.6b723156.svg"
            />
            <meta
              property="og:description"
              content="Bienvenue sur Peps.life, les meilleures recettes des plats iconiques"
            />
            <meta property="og:site_name" content="Peps" />

            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>
            <div className="container">
              <Component {...pageProps} />
            </div>
          </Layout>
        </NotificationsProvider>
      </UserContext.Provider>
    </MantineProvider>
  );
}

export default MyApp;
