import Layout from '@/components/Layout/Layout';
import styles from '../../app/Styles/tietosuoja.module.css';
import { privacyTermsContent } from '../app/data/tietosuojadata';

const RatingsPage = () => {
  return (
    <Layout>
    <div className={styles.hello}>
    <div className={styles.container}dangerouslySetInnerHTML={{ __html: privacyTermsContent }} />
    </div>
    </Layout>
  );
};

export default RatingsPage;
