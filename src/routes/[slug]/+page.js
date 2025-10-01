import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const modules = import.meta.glob('../../lib/content/*.{md,txt}', { query: '?raw', import: 'default' });

  const mdPath = `../../lib/content/${params.slug}.md`;
  const txtPath = `../../lib/content/${params.slug}.txt`;

  const mdModule = modules[mdPath];
  const txtModule = modules[txtPath];

  if (mdModule) {
    const content = await mdModule();
    return {
      content
    };
  }

  if (txtModule) {
    const content = await txtModule();
    return {
      content
    };
  }

  throw error(404, `Could not find ${params.slug}`);
}