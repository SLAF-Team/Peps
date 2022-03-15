import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import UpdateUserForm from "../../components/editUser";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  const router = useRouter();
  const [form, setForm] = useState(false);

  console.log("utilisateur connecté");
  console.log(user);

  // fetch current user
  async function getUser() {
    const result = await axios.get("/api/user/getCurrentUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(result.data.user);
  }
  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = () => {
    setForm(!form);
  };

  // delete user bloc
  const handleDeleteUser = () => {
    if (window.confirm("Es tu sûr de vouloir supprimer ton compte?")) {
      deleteUser();
    }
  };

  async function deleteUser() {
    const result = await axios.delete("/api/user/deleteUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    Cookies.remove("token");
    router.push("/");
  }

  return (
    <div>
      {user ? (
        <>
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          {!form && (
            <button onClick={() => handleUpdateUser()}>
              Editer mon profil
            </button>
          )}
          {form ? <UpdateUserForm user={user} /> : null}
          <button onClick={() => handleDeleteUser()}>
            <a>Supprimer mon compte</a>
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
