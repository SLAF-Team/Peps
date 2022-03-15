import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// UseUserContext a import 
import { useRouter } from "next/router";

const UpdateUserForm = ({ user }) => {
  const { setUser } = useUserContext();
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isOwner, setOwner] = useState(user.isowner);

  const token = Cookies.get("token");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleCheck = () => {
    setOwner(!isOwner);
  };

  async function signUserUp() {
    const result = await axios.put(
      "/api/user/editUser",
      {
        id: user.id,
        name: name,
        email: email,
        isowner: isOwner,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser(result.data);
  }

  // Handling the form submission + fetch data + update state
  const handleSubmit = (e) => {
    e.preventDefault();
    signUserUp();
    router.push(`/profile`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="my-2">Nom</label>
        <input
          onChange={handleName}
          className="form-control"
          value={name}
          type="text"
        />
      </div>
      <div className="form-group">
        <label className="my-2">Email*</label>
        <input
          onChange={handleEmail}
          className="form-control"
          value={email}
          type="email"
        />
      </div>
      <div className="form-check  mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onChange={handleCheck}
        />
        <label className="form-check-label">Je suis un propriétaire</label>
      </div>
      <button type="submit" className="btn btn-primary my-3">
        J'édite
      </button>
    </form>
  );
};

export default UpdateUserForm;
