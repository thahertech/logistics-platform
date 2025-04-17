import { FaStar, FaChartBar, FaUserCircle } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '@/app/Styles/Asiakastarinat.module.css';
import Layout from '@/components/Layout/Layout';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Asiakastarinat = ({ chartData }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Asiakastarinat 
        </h1>

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h3>Asiakas: ABC Logistiikka</h3>
            <p>
              ABC Logistiikka paransi tehokkuuttaan 30 % hyödyntämällä alustamme! Helppokäyttöinen pääsy palautuslastiin
              vähensi kustannuksia ja paransi merkittävästi reittisuunnittelua.
            </p>
            <FaUserCircle className={styles.cardIcon} />
          </div>
          <div className={styles.card}>
            <h3>Asiakas: XYZ Kuljetus</h3>
            <p>
              XYZ Kuljetuksen asiakastyytyväisyys nousi 20 % käytettyään alustamme luotettavia kuljetuspalveluja. Hinnoittelun
              ja aikataulutuksen läpinäkyvyys johti parantuneeseen luottamukseen ja toistuviin tilauksiin.
            </p>
            <FaUserCircle className={styles.cardIcon} />
          </div>
        </div>

        {/* Kaavio-osio */}
        <h2 className={styles.sectionTitle}>Vaikutus ja kasvu ajan mittaan</h2>
        <div className={styles.chartContainer}>
          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Asiakastyytyväisyyden parantuminen</h4>
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Lisätilastot tai mittarit */}
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <h3>Onnistuneet lähetykset</h3>
            <p>98 % lähetyksistä toimitettiin ajallaan viimeisellä neljänneksellä.</p>
            <FaChartBar className={styles.statIcon} />
          </div>
          <div className={styles.statCard}>
            <h3>Kustannussäästöt</h3>
            <p>Asiakkaamme säästivät keskimäärin 15 % kuljetuskustannuksista optimoimalla reittejä ja palautuslastia.</p>
            <FaChartBar className={styles.statIcon} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Fetch data at build time
export async function getStaticProps() {
  const chartData = {
    labels: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu'],
    datasets: [
      {
        label: 'Asiakastyytyväisyys',
        data: [60, 70, 80, 90, 85],
        backgroundColor: '#003366',
        borderColor: '#003',
        borderWidth: 1,
      },
    ],
  };

  return {
    props: { chartData },
  };
}

export default Asiakastarinat;