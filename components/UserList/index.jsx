import { useState } from "react";
import styles from "./UserList.module.css";
import EditUser from "../editUser/index";
import ButtonSettings from "../ButtonSettings";

const UserList = ({ user, color }) => {
  const [form, setForm] = useState(false);

  const handleUpdateUser = () => {
    setForm(!form);
  };

  return (
    <div className={styles.top + " row"}>
      <div className="col-3">
        <div className={styles.avatarDiv}>
          <div className={styles.avatar} style={{ backgroundColor: color }}>
            <span className={styles.letter}>{user?.name[0].toUpperCase()}</span>
          </div>
        </div>
      </div>
      <div className="col-9">
        {user?.email && (
          <div className={styles.float}>
            {!form && (
              <ButtonSettings
                label="Éditer mon profil"
                handleClick={() => handleUpdateUser()}
              />
            )}
            {form && (
              <EditUser user={user} handleUpdateUser={handleUpdateUser} />
            )}
          </div>
        )}
        <div>
          <p className={styles.name}>{user?.name}</p>
          <p className={styles.email}>{user?.email}</p>
        </div>
        {!user?.email && <span>Créée par {user?.name}</span>}
      </div>
    </div>
  );
};

export default UserList;
