import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Deshabilitado temporalmente - solo usuarios hardcodeados
  return new Response(
    JSON.stringify({ message: 'Registro deshabilitado temporalmente. Contacta al administrador.' }),
    { status: 403, headers: { 'Content-Type': 'application/json' } }
  );
};
