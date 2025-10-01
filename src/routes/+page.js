import { error } from '@sveltejs/kit';

export async function load() {
  const modules = import.meta.glob('../lib/content/*.md', { query: '?raw', import: 'default' });

  const path = `../lib/content/index.md`;
  const module = Object.entries(modules).find(([key]) => key.includes(path));

  if (module) {
    const content = await module[1]();
    return {
      content
    };
  } else {
    throw error(404, `Could not find index.md`);
  }
}
