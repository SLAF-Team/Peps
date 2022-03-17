import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Peps</title>
        <meta name="description" content="Peps" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Merriweather:wght@700;900&display=swap');
        </style>
      </Head>
      <main className={styles.main}>
        <h1>OM PAGE</h1>
      </main>
    </div>
  );
}
