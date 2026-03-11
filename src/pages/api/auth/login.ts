import type { APIRoute } from 'astro';
import { getAuthUsers } from '../../config/users';

// IMPORTANTE: Forzar que esta ruta sea server-side en modo hybrid
export const prerender = false;

// Obtener usuarios desde variables de entorno
const USERS = getAuthUsers();

// Generar UUID simple
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const POST: APIRoute = async ({ request, cookies }) => {
  console.log('📥 Request recibido en /api/auth/login');
  
  try {
    const data = await request.json();
    console.log('✅ Data parseado:', data);
    
    const { email, password } = data;
    
    if (!email || !password) {
      console.log('❌ Faltan credenciales');
      return new Response(
        JSON.stringify({ message: 'Email y contraseña son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('🔐 Intentando login con:', email);

    const user = USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      console.log('❌ Usuario no encontrado o contraseña incorrecta');
      return new Response(
        JSON.stringify({ message: 'Email o contraseña incorrectos' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Usuario encontrado:', user.name, '| Rol:', user.role);

    // Crear sesión
    const sessionToken = generateUUID();
    
    cookies.set('session', sessionToken, {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    cookies.set('userId', user.id, {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    cookies.set('userRole', user.role, {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log('🍪 Cookies configuradas correctamente');
    console.log('🎉 Login exitoso!');

    return new Response(
      JSON.stringify({
        message: 'Login exitoso',
        role: user.role,
        name: user.name,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('💥 Error en login:', error);
    return new Response(
      JSON.stringify({ message: 'Error en el servidor', error: String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
