import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const NavBar = () => {
  const router = useRouter();

  const handleClick = () => {
    if (window.confirm("Es tu sûr de vouloir te déconnecter?")) {
      Cookies.remove("token");
      router.push("/");
    }
  };

  return (
    <div>
      <Link href="/" exact>
        <a>OM</a>
      </Link>
      <Link href="/signin" exact>
        <a>Connexion</a>
      </Link>
      <Link href="/signup" exact>
        <a>Inscription</a>
      </Link>
      <Link href="/signout" exact>
        <a onClick={() => handleClick()}>Déconnexion</a>
      </Link>
    </div>
  );
};

export default NavBar;
