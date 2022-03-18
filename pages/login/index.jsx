import { useState } from "react";
import Selector from "../../components/Selector";
import styles from "./Login.module.css";
import SignIn from "../../components/Login/SignIn";
import SignUp from "../../components/Login/SignUp";

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [style, setStyle] = useState(false);

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
