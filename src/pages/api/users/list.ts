import type { APIRoute } from 'astro';
import { getAuthUsers } from '../../config/users';

export const prerender = false;

// Obtener usuarios desde variables de entorno
const USERS = getAuthUsers();

export const GET: APIRoute = async ({ cookies }) => {
  try {
    // Verificar autenticación y rol
    const userId = cookies.get('userId');
    if (!userId) {
      return new Response(
        JSON.stringify({ message: 'No autenticado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = USERS.find((u) => u.id === userId.value);
    if (!user || user.role !== 'admin') {
      return new Response(
        JSON.stringify({ message: 'No autorizado' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Devolver usuarios sin contraseñas
    const usersPublic = USERS.map(({ id, name, email, role }) => ({
      id,
      name,
      email,
      role,
    }));

    return new Response(
      JSON.stringify({ users: usersPublic }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error al listar usuarios' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
