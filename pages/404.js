import styles from '../styles/Error404.module.css'
import Button from '../components/Button'

export default function Custom404() {

  return (
    <div className={styles.container}>
      <div className={styles.textbox}>
        <h1 className={styles.title}>
          Chou blanc !
        </h1>
        <h2 className={styles.title}>
          <span className={styles.adapt}>La page que vous cherchez n'existe pas</span>
        </h2>
        <Button label="Retour à l'accueil" type="primary" href="/" />
      </div>
    </div>
  );
}

