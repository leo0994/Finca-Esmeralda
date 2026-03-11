import type { APIRoute } from 'astro';

export const prerender = false;
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    
    try {
      await fs.access(galleryDir);
    } catch {
      return new Response(
        JSON.stringify({ photos: [] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const files = await fs.readdir(galleryDir);
    const photos = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/gallery/${file}`);

    return new Response(
      JSON.stringify({ photos }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error al listar fotos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
