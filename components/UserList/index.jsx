import { useState } from "react";
import styles from "./UserList.module.css";
import EditUser from "../editUser/index";

const UserList = ({ user, handleDeleteUser, color }) => {
  const [form, setForm] = useState(false);

  const handleUpdateUser = () => {
    setForm(!form);
  };

  return (
    <div className={styles.top + " row"}>
      <div className="col-3">
        <div className={styles.avatar} style={{ backgroundColor: color }}>
          <span className={styles.letter}>{user?.name[0].toUpperCase()}</span>
        </div>
      </div>
      <div className="col-9">
        <div>
          <p className={styles.name}>{user?.name}</p>
          <p className={styles.email}>{user?.email}</p>
        </div>
        {user.email ? (
          <div>
            {!form && (
              <button onClick={() => handleUpdateUser()}>
                Editer mon profil
              </button>
            )}
            {form && (
              <EditUser user={user} handleUpdateUser={handleUpdateUser} />
            )}
            <button onClick={() => handleDeleteUser()}>
              <a>Supprimer mon compte</a>
            </button>
          </div>
        ) : (
          <span>Créée par {user.user.name}</span>
        )}
      </div>
    </div>
  );
};

export default UserList;
