import { useState } from "react";
import EditUser from "../../components/EditUser";
import styles from "./UserList.module.css";

const UserList = ({ user, handleDeleteUser }) => {
  const [form, setForm] = useState(false);

  const handleUpdateUser = () => {
    setForm(!form);
  };

  return (
    <div className={styles.top + " row"}>
      <div className="col-3">
        <div className={styles.avatar}>
          <span className={styles.letter}>{user?.name[0].toUpperCase()}</span>
        </div>
      </div>
      <div className="col-9">
        <div>
          <p className={styles.name}>{user?.name}</p>
          <p className={styles.email}>{user?.email}</p>
        </div>
        <div>
          {" "}
          {!form && (
            <button onClick={() => handleUpdateUser()}>
              Editer mon profil
            </button>
          )}
          {form && <EditUser user={user} handleUpdateUser={handleUpdateUser} />}
          <button onClick={() => handleDeleteUser()}>
            <a>Supprimer mon compte</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
