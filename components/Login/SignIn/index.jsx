import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { useUserContext } from "../../../context/UserContext";
import styles from "../Login.module.css";
import ButtonForm from "../../ButtonForm";
import { useNotifications } from "@mantine/notifications";

const SignIn = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const notifications = useNotifications();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function signUserIn(data) {
    const result = await axios.post("/api/user/getUser", {
      ...data,
    });
    Cookies.set("token", result.data.token, { expires: 7 });
    setUser(result.data.user);
    notifications.showNotification({
      title: "Bravo !",
      message: "Un plaisir de vous retrouver sur Peps",
      color: "green",
    });
    router.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire",
        message: "email ou mot de passe manquant",
        color: "red",
      });
    } else {
      const data = {
        email: email,
        password: password,
      };
      signUserIn(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.size}>
      <div className={styles.form}>
        <input
          id="email"
          type="text"
          onChange={handleEmail}
          className={styles.field}
          placeholder="Email"
        />

        <input
          id="password"
          type="password"
          onChange={handlePassword}
          className={styles.field}
          placeholder="Mot de passe"
        />
      </div>
      <div className={styles.button}>
        <ButtonForm label="Connexion" theme="warning" />
      </div>
    </form>
  );
};

export default SignIn;
