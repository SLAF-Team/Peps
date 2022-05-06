import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./User.module.css";
import RecipeCard from "../../components/recipeCard";
import UserList from "../../components/UserList";
import Selector from "../../components/Selector";
import List from "../../components/List/List";

const UserProfile = () => {
  const { query } = useRouter();
  const { id } = query;
  const [user, setUser] = useState(null);
  const [contribution, setContribution] = useState(false);
  const [style, setStyle] = useState(false);

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  const handleClickLeft = () => {
    setContribution(false);
    setStyle(false);
  };

  const handleClickRight = () => {
    setContribution(true);
    setStyle(true);
  };

  async function getUser() {
    const result = await axios.post("/api/user/getUser", {
      where: {
        id: parseInt(id),
      },
      include: {
        recipes: {
          include: {
            cook: { select: { email: true, name: true, id: true } },
            tags: { select: { id: true } },
            _count: { select: { likes: true, comments: true } },
            ratings: true,
          },
        },
        lists: true,
      },
    });
    setUser(result.data.user);
  }

  return (
    <>
      <UserList user={user} color="#ffd12f" />
      <Selector
        left="SES CONTRIBUTIONS"
        right="SES LISTES"
        handleClickLeft={handleClickLeft}
        handleClickRight={handleClickRight}
        style={style}
      />
      {!contribution ? (
        <>
          <div className={styles.cards}>
            <div className="row">
              {user?.recipes?.map((recipe, index) => (
                <RecipeCard recipe={recipe} key={index} col="col-3 col-6-sm" />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className={styles.listHeader}>
              <div className="col-2 col-4-sm"></div>
              <div className="col-6 col-4-sm">
                <span className={styles.spanHeader}>Titre</span>
              </div>
              <div className="col-4 col-4-sm">
                <span className={styles.spanHeader}>Dernière mise à jour</span>
              </div>
            </div>
          </div>
          {user?.lists?.map((list, index) => (
            <div className="row">
              <div className={styles.listCards}>
                <List list={list} key={index} />
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default UserProfile;
