import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { redirect } from "next/navigation"; // Import redirect function
import styles from "@/app/Styles/articlePage.module.css";

function getArticles() {
  const articlesDir = path.join(process.cwd(), "content/articles");

  if (!fs.existsSync(articlesDir)) return [];

  const filenames = fs.readdirSync(articlesDir);
  return filenames.map((filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return { slug: filename.replace(".md", ""), ...data };
  });
}

function getArticleBySlug(slug) {
  const filePath = path.join(process.cwd(), "content/articles", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  return { content, ...data };
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

const ArticlePage = async ({ params }) => {
  redirect("/");

  const article = getArticleBySlug(params.slug);

  return (
    <div className={styles.articleContainer}>
      <h1 className={styles.articleTitle}>{article.title}</h1>
      <p className={styles.articleDate}>{article.date}</p>
      <div className={styles.articleContent}>{article.content}</div>
      <div className={styles.articleFooter}>Written by {article.author}</div>
    </div>
  );
};

export default ArticlePage;
