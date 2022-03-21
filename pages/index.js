import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>OM PAGE</h1>
      <Button href="/recipes/new" label="Ajouter une recette" />
      <br />
      <Button href="/recipes" label="Voir les recettes" type="success" />
    </main>
  );
}
