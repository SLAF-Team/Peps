import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../context/UserContext";
import styles from "./EditUser.module.css";
import { useRouter } from "next/router";
import { emailValidation } from "../../lib/authfront";
import { useNotifications } from "@mantine/notifications";

const EditUser = ({ user, handleUpdateUser }) => {
  const token = Cookies.get("token");
  const { setUser } = useUserContext();
  const router = useRouter();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const notifications = useNotifications();

  // Handling the name changee
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // delete user bloc
  const handleDeleteUser = () => {
    if (window.confirm("Es tu sûr de vouloir supprimer ton compte?")) {
      deleteUser();
    }
  };

  async function deleteUser() {
    await axios.delete("/api/user/deleteUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  }

  async function editUser() {
    if (!name || !email) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire",
        message: "nom ou email manquant",
        color: "red",
      });
    }
    if (!emailValidation(email)) {
      notifications.showNotification({
        title: "Erreur dans votre formulaire",
        message: "Email invalide",
        color: "red",
      });
    }
    if (emailValidation(email) && name && email) {
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
      handleUpdateUser();
    }
  }

  // Handling the form submission + fetch data + update state
  const handleSubmit = (e) => {
    e.preventDefault();
    editUser();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button onClick={() => handleUpdateUser()} className={styles.btnDanger}>
        FERMER
      </button>
      <div>
        <input
          onChange={handleName}
          className={styles.field}
          value={name}
          type="text"
        />
      </div>
      <div>
        <input
          onChange={handleEmail}
          className={styles.field}
          value={email}
          type="text"
        />
      </div>
      <button type="submit" className={styles.btnPrimary}>
        ÉDITER
      </button>
      <button onClick={() => handleDeleteUser()} className={styles.btnDanger}>
        SUPPRIMER
      </button>
    </form>
  );
};

export default EditUser;
