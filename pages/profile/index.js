import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios"

const Profile = () => {
  const token = Cookies.get("token");
  const router = useRouter();

  async function deleteUser() {
    const result = await axios.delete("/api/user/deleteUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(result)
    // Cookies.remove("token");
    // router.push("/");
  }

  const handleDelete = () => {
    if (window.confirm("Es tu sûr de vouloir supprimer ton compte?")) {
      deleteUser();
    }
  };
  
  return (
    <div>
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
