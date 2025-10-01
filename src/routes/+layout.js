export const prerender = true;

export async function load() {
  const posts = [
    { slug: 'index', title: 'Home' },
    { slug: 'cv-en', title: 'CV (English)' },
    { slug: 'cv-imprimable', title: 'CV (Français)' },
    { slug: 'achievements', title: 'Achievements' },
    { slug: '3d-viewer', title: '3D Viewer' }
  ];

  return {
    posts
  };
}