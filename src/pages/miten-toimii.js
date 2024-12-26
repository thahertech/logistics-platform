import Layout from '@/app/Dashboard/Layout';
import { FaTruck, FaCogs, FaCheckCircle } from 'react-icons/fa';
import styles from '@/app/Styles/HowItWorks.module.css';

const HowItWorks = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Kuinka Se Toimii?</h1>

        <div className={styles.stepContainer}>
          <div className={styles.stepCard}>
            <FaTruck className={styles.icon} />
            <h2>1. Rekisteröidy ja liity</h2>
            <p>
              Liity alustallemme rekisteröitymällä ja luomalla tilisi. Sen jälkeen voit alkaa etsiä ja valita kuljetusvaihtoehtoja tarpeidesi mukaan.
            </p>
          </div>

          <div className={styles.stepCard}>
            <FaCogs className={styles.icon} />
            <h2>2. Reittien ja lastien optimointi</h2>
            <p>
              Optimoi reitit ja lastit helposti alustallamme. Hyödynnä paluukuljetuksia, jotta voit vähentää tyhjiä kilometrejä ja pienentää kuljetuskustannuksia.
            </p>
          </div>

          <div className={styles.stepCard}>
            <FaCheckCircle className={styles.icon} />
            <h2>3. Seuraa ja hallitse toimituksia</h2>
            <p>
              Seuraa toimituksia reaaliajassa ja varmista, että kaikki menee suunnitelmien mukaan. Lähetämme sinulle päivityksiä ja ilmoituksia.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Helppo, luotettava ja tehokas logistiikkaratkaisu kaikille!</p>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;