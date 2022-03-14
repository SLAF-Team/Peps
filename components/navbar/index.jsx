import Link from "next/link";

const NavBar = () => {

  return (
    <div>
      <Link href="/signin" exact>
        <a>Connexion</a>
      </Link>
      <Link href="/signup" exact>
        <a>Inscription</a>
      </Link>
      <Link href="/signout" exact>
        <a>Déconnexion</a>
      </Link>
    </div>
  );
}

export default NavBar