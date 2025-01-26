import Layout from '@/app/Dashboard/Layout';
// import Ratings from '../app/Components/forms/ratings';
import styles from '../app/Styles/tietosuoja.module.css';
import { privacyTermsContent } from '../app/user/User/tietosuojadata';

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
