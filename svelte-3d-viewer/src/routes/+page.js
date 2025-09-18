export const prerender = true;

export async function load() {
  const posts = [
    { slug: 'index', title: 'Home' },
    { slug: 'cv-en', title: 'CV (English)' },
    { slug: 'cv-imprimable', title: 'CV (Français)' },
    { slug: 'achievements', title: 'Achievements' },
    { slug: 'github-actions-basics', title: 'GitHub Actions Basics' },
    { slug: 'mkdocs-setup', title: 'MkDocs Setup' },
    { slug: 'common-issues-and-solutions', title: 'Common Issues' },
    { slug: 'advanced-topics', title: 'Advanced Topics' }
  ];

  return {
    posts
  };
}