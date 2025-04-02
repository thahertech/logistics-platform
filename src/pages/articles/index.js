import Layout from "@/app/dashboard/Layout";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import styles from '@/app/Styles/articles.module.css';
import Head from "next/head";

export default function ArticlesPage({ articles }) {
  return (
    <Layout>
      <Head>
        <title>Artikkelit - Logistix</title>
        <meta name="robots" content="noindex, follow" /> 
        <meta name="description" content="Löydä hyödyllisiä artikkeleita, jotka liittyvät liiketoimintaamme. Pysy ajan tasalla logistiikasta." />
  <meta name="keywords" content="artikkelit, liiketoiminta, SEO, logistiikka, logistiikkaratkaisu, kuljetuspalvelut, rahtikuljetus, yrityskuljetuspalvelu, rahti" />
</Head>
      <div className={styles.container}>
        <h1>Artikkelit</h1>
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`}>
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const articlesDir = path.join(process.cwd(), "content/articles");

  if (!fs.existsSync(articlesDir)) return { props: { articles: [] } };

  const filenames = fs.readdirSync(articlesDir);
  const articles = filenames.map((filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return { slug: filename.replace(".md", ""), ...data };
  });

  return { props: { articles } };
}