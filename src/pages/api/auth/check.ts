import type { APIRoute } from 'astro';
import { getAuthUsers } from '../../config/users';

export const prerender = false;

// Obtener usuarios desde variables de entorno
const USERS = getAuthUsers();

export const GET: APIRoute = async ({ cookies }) => {
  const session = cookies.get('session');
  const userId = cookies.get('userId');

  if (!session || !userId) {
    return new Response(
      JSON.stringify({ authenticated: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const user = USERS.find((u) => u.id === userId.value);

  if (!user) {
    return new Response(
      JSON.stringify({ authenticated: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
