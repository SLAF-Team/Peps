import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";

const UpdateUserForm = ({user}) => {
  const token = Cookies.get("token");
  const { setUser } = useUserContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  async function editUser() {
    const result = await axios.put(
      "/api/user/editUser",
      {
        id: user.id,
        name: name,
        email: email,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser(result.data);
  }

  // Handling the form submission + fetch data + update state
  const handleSubmit = (e) => {
    e.preventDefault();
    editUser();
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
      <button type="submit" className="btn btn-primary my-3">
        J'édite
      </button>
    </form>
  );
};

export default UpdateUserForm;
