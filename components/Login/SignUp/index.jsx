import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useUserContext } from "../../../context/UserContext";
import styles from "../Login.module.css";
import ButtonForm from "../../ButtonForm";
import { useNotifications } from "@mantine/notifications";

const SignUp = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const notifications = useNotifications();

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function signUserUp(data) {
    const result = await axios.post("/api/user/addUser", {
      ...data,
    });
    Cookies.set("token", result.data.token, { expires: 7 });
    setUser(result.data.user);
    router.push("/profile");
  }

  // Handling the form submission + fetch data + update state

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
        name: name,
        email: email,
        password: password,
      };
      signUserUp(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.size}>
      <div className={styles.form}>
        <input
          id="name"
          type="text"
          onChange={handleName}
          className={styles.field}
          placeholder="Nom d'utilisateur"
        />
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
        <ButtonForm label="Inscription" type="warning" />
      </div>
    </form>
  );
};

export default SignUp;
