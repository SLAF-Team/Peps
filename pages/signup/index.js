import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import classes from "../../styles/Home.module.css";

const SignUp = () => {
  const router = useRouter();

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
    console.log(result)
    Cookies.set("token", result.data.token, { expires: 7 });
    router.push("/");
  }

  // Handling the form submission + fetch data + update state
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    signUserUp(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className={classes.forms}>
        <form onSubmit={handleSubmit}>
          <h1>Inscription</h1>
          <div className="form-group">
            <label>Nom</label>
            <input
              onChange={handleName}
              value={name}
              type="text"
            />
          </div>
          <div className="form-group">
            <label>Email *</label>

            <input
              onChange={handleEmail}
              value={email}
              type="email"
            />
          </div>
          <div className="form-group">
            <label>Password *</label>

            <input
              onChange={handlePassword}
              value={password}
              type="password"
            />
          </div>

          <button type="submit">
            Inscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
