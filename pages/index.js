import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import Cookies from 'js-cookie'

export default function Home() {
  const token = Cookies.get('token')
  console.log(token)
  return (
    <main className={styles.main}>
      <h1>OM PAGE</h1>
      <Button href="/recipes/new" label="Ajouter une recette" />
      <br />
      <Button href="/recipes" label="Voir les recettes" type="success" />
    </main>
  );
}
