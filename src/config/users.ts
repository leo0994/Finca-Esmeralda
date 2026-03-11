// Configuración de usuarios desde variables de entorno

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

// Función para obtener usuarios desde variables de entorno
export function getUsers(): User[] {
  return [
    {
      id: import.meta.env.USER_1_ID || '1',
      name: import.meta.env.USER_1_NAME || 'Usuario 1',
      email: import.meta.env.USER_1_EMAIL || 'user@example.com',
      password: import.meta.env.USER_1_PASSWORD || 'changeme',
      role: (import.meta.env.USER_1_ROLE || 'user') as 'user' | 'admin',
    },
    {
      id: import.meta.env.USER_2_ID || '2',
      name: import.meta.env.USER_2_NAME || 'Admin',
      email: import.meta.env.USER_2_EMAIL || 'admin@example.com',
      password: import.meta.env.USER_2_PASSWORD || 'changeme',
      role: (import.meta.env.USER_2_ROLE || 'admin') as 'user' | 'admin',
    },
  ];
}

// Cache de usuarios
let cachedUsers: User[] | null = null;

// Obtener usuarios (con cache)
export function getAuthUsers(): User[] {
  if (!cachedUsers) {
    cachedUsers = getUsers();
  }
  return cachedUsers;
}
