import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const post = await import(`../../lib/content/${params.slug}.md?raw`);
    return {
      content: post.default
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
}
