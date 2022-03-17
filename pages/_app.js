import "../styles/globals.css";
import Layout from "../components/layout"
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

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

  console.log("user from app");
  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
