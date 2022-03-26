import { useState } from "react";
import Selector from "../../components/Selector";
import styles from "./Login.module.css";
import SignIn from "../../components/Login/SignIn";
import SignUp from "../../components/Login/SignUp";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useNotifications } from "@mantine/notifications";

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [style, setStyle] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();
  const notifications = useNotifications();

  useEffect(() => {
    if (token) {
      notifications.showNotification({
        title: "Connexion",
        message: "Vous êtes déjà connecté",
        color: "green",
      });
      router.push("/");
    }
  }, []);

  const handleClickLeft = () => {
    setSignUp(false);
    setStyle(false);
  };

  const handleClickRight = () => {
    setSignUp(true);
    setStyle(true);
  };

  return (
    <div className={styles.loginForm}>
      <div className={styles.formControl}>
        <Selector
          left="SE CONNECTER"
          right="S'INSCRIRE"
          handleClickLeft={handleClickLeft}
          handleClickRight={handleClickRight}
          style={style}
        />
        {!signUp && <SignIn />}
        {signUp && <SignUp />}
      </div>
    </div>
  );
};

export default Login;
