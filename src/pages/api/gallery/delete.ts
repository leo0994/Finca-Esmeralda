import type { APIRoute } from 'astro';
import { getAuthUsers } from '../../config/users';

export const prerender = false;
import fs from 'fs/promises';
import path from 'path';

// Obtener usuarios desde variables de entorno
const USERS = getAuthUsers();

export const DELETE: APIRoute = async ({ request, cookies }) => {
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

    const { photo } = await request.json();

    if (!photo) {
      return new Response(
        JSON.stringify({ message: 'No se especificó la foto' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const filename = path.basename(photo);
    const filepath = path.join(process.cwd(), 'public', 'gallery', filename);

    try {
      await fs.unlink(filepath);
      return new Response(
        JSON.stringify({ message: 'Foto eliminada exitosamente' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch {
      return new Response(
        JSON.stringify({ message: 'Foto no encontrada' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error deleting photo:', error);
    return new Response(
      JSON.stringify({ message: 'Error al eliminar la foto' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
