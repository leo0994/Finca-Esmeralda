import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete('session', { path: '/' });
  cookies.delete('userId', { path: '/' });

  return new Response(
    JSON.stringify({ message: 'Sesión cerrada' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
