import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), "content", "articles");

export function getArticles() {
  const filenames = fs.readdirSync(articlesDir);

  return filenames.map((filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      ...data,
      content,
    };
  });
}

export function getArticleBySlug(slug) {
  const filePath = path.join(articlesDir, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  };
}