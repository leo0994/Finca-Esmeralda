import type { APIRoute } from 'astro';
import { getAuthUsers } from '../../config/users';

export const prerender = false;
import fs from 'fs/promises';
import path from 'path';

// Obtener usuarios desde variables de entorno
const USERS = getAuthUsers();

export const POST: APIRoute = async ({ request, cookies }) => {
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

    const formData = await request.formData();
    const photos = formData.getAll('photos') as File[];

    if (photos.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No se recibieron fotos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'gallery');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles: string[] = [];

    for (const photo of photos) {
      if (!photo.type.startsWith('image/')) {
        continue;
      }

      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const ext = path.extname(photo.name);
      const filename = `photo-${timestamp}-${randomStr}${ext}`;
      const filepath = path.join(uploadDir, filename);

      const buffer = Buffer.from(await photo.arrayBuffer());
      await fs.writeFile(filepath, buffer);

      uploadedFiles.push(`/gallery/${filename}`);
    }

    return new Response(
      JSON.stringify({
        message: 'Fotos subidas exitosamente',
        files: uploadedFiles,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error uploading photos:', error);
    return new Response(
      JSON.stringify({ message: 'Error al subir las fotos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
