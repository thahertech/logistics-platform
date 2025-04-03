import { getArticleBySlug } from '@/lib/articles';
import { useRouter } from 'next/router';
import { getArticles } from '@/lib/articles';
import Layout from '@/app/Dashboard/Layout';
import styles from '@/app/Styles/articlePage.module.css';


export async function getStaticPaths() {
  const articles = getArticles();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  return {
    props: { article },
  };
}

const ArticlePage = ({ article }) => (
    <Layout>
      <div className={styles.articleContainer}>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <p className={styles.articleDate}>{article.date}</p>
        <div className={styles.articleContent}>{article.content}</div>
        <div className={styles.articleFooter}>Written by {article.author}</div>
      </div>
    </Layout>
  );

export default ArticlePage;
