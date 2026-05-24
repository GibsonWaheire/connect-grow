// Individual blog post API — Cloudflare Workers compatible
import { blogPosts } from './data.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    if (request.method !== 'GET') return json({ success: false, error: 'Method not allowed' }, 405);

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    const post = blogPosts.find(p => p.id === id) || null;
    if (!post) return json({ success: false, error: 'Post not found' }, 404);
    return json({ success: true, post });
  },
};

