import styles from '../styles/Error404.module.css'
import Button from '../components/Button'

export default function Custom404() {

  return (
    <div className={styles.container}>
      <div className={styles.textbox}>
        <h1 className={styles.title}>404 - Page introuvable</h1>
        <Button label="retour à l'Accueil" type="primary" href="/" />
      </div>
    </div>
  )
}

