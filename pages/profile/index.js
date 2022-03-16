import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import UpdateUserForm from "../../components/editUser";

const Profile = () => {
  const { user, setUser } = useUserContext();
  const token = Cookies.get("token");
  const router = useRouter();
  const [form, setForm] = useState(false);

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
    setUser(null);
    router.push("/");
  }

  return (
    <div>
      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
      {!form && (
        <button onClick={() => handleUpdateUser()}>Editer mon profil</button>
      )}
      {form && (
        <UpdateUserForm user={user} handleUpdateUser={handleUpdateUser} />
      )}
      <button onClick={() => handleDeleteUser()}>
        <a>Supprimer mon compte</a>
      </button>
      {user?.recipes.map((recipe) => (
        <>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
        </>
      ))}
    </div>
  );
};

export default Profile;
