import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  const router = useRouter();

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

  // delete user bloc
  async function deleteUser() {
    const result = await axios.delete("/api/user/deleteUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    Cookies.remove("token");
    router.push("/");
  }

  const handleDelete = () => {
    if (window.confirm("Es tu sûr de vouloir supprimer ton compte?")) {
      deleteUser();
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ) : null}
      <Link href="/" exact>
        <a>Update</a>
      </Link>

      <button onClick={() => handleDelete()}>
        <a>Supprimer mon compte</a>
      </button>
    </div>
  );
};

export default Profile;
