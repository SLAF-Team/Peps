import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { useUserContext } from "../../context/UserContext";

const SignIn = () => {
  const router = useRouter();
  const { setUser } = useUserContext();

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
    setUser(result.data.user)
    router.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    signUserIn(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Connexion</h1>

          <div>
            <label htmlFor="email">Email *</label>
            <input id="email" type="text" onChange={handleEmail} />
          </div>

          <div>
            <label htmlFor="password">Mot de passe *</label>
            <input id="password" type="password" onChange={handlePassword} />
          </div>

          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
