
import Link from "next/link";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import styles from "@/app/Styles/articles.module.css";
import Head from "next/head";

// Server-side function to fetch articles
async function getArticles() {
  const articlesDir = path.join(process.cwd(), "content/articles");

  if (!fs.existsSync(articlesDir)) return [];

  const filenames = fs.readdirSync(articlesDir);
  const articles = filenames.map((filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return { slug: filename.replace(".md", ""), ...data };
  });

  return articles;
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
<>
      <Head>
        <title>Artikkelit - Logistix</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="Löydä hyödyllisiä artikkeleita, jotka liittyvät liiketoimintaamme. Pysy ajan tasalla logistiikasta."
        />
        <meta
          name="keywords"
          content="artikkelit, liiketoiminta, SEO, logistiikka, logistiikkaratkaisu, kuljetuspalvelut, rahtikuljetus, yrityskuljetuspalvelu, rahti"
        />
      </Head>
      <div className={styles.container}>
        <h1>Artikkelit</h1>
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      </>
  );
}
