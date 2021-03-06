import Link from "next/link";
import styles from "./Footer.module.css";
import { useUserContext } from "../../context/UserContext";

const Footer = () => {
  const { user } = useUserContext();

  return (
    <div className={styles.footer}>
      <div className="container row">
        <div className="col-6">
          <div className={styles.border}>
            <span className={styles.brand}>Peps</span>
            <p className={styles.description}>
              Peps est une base de donnée culinaire, qui a pour vision de
              façonner l'espace alimentaire numérique. Une recette est une
              déclinaison d'un type de plat. Perdez-vous dans notre labyrinthe
              de saveurs !
            </p>
            <a href="https://github.com/SLAF-Team/Cookogs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className={styles.icon}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="col-3">
          <div className={styles.border}>
            <div className={styles.title}>
              <span>Mon espace</span>
            </div>
            {user ? (
              <>
                <Link href="/">
                  <p className={styles.link}>Accueil</p>
                </Link>
                <Link href="/profile">
                  <p className={styles.link}>Profil</p>
                </Link>
                <Link href="/profile?list=true" as="/profile">
                  <p className={styles.link}>Listes</p>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <p className={styles.link}>Connexion</p>
                </Link>
                <Link href="/login">
                  <p className={styles.link}>Inscription</p>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="col-3">
          <div className={styles.title}>
            <span>Découvrez</span>
          </div>
          <Link href="/recipes/new">
            <p className={styles.link}>Proposer une recette</p>
          </Link>
          <Link href="/dishes/new">
            <p className={styles.link}>Proposer un plat</p>
          </Link>
          <Link href="/dishes">
            <p className={styles.link}>Plats</p>
          </Link>
          <Link href="/recipes">
            <p className={styles.link}>Recettes</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
