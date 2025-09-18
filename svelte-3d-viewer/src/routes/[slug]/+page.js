import { error } from '@sveltejs/kit';

export async function load({ params }) {
  // Use import.meta.glob to make Vite aware of all the markdown files.
  // This is more robust for static site generation (prerendering).
  const modules = import.meta.glob('../../lib/content/*.md', { query: '?raw', import: 'default' });

  const path = `../../lib/content/${params.slug}.md`;
  const module = Object.entries(modules).find(([key]) => key.includes(path));

  if (module) {
    const content = await module[1]();
    return {
      content
    };
  } else {
    throw error(404, `Could not find ${params.slug}`);
  }
}
