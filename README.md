# Finca Esmeralda 🌿

Sitio web oficial de Finca Esmeralda con sistema de administración para gestión de galería de fotos.

## 🚀 Tecnologías

- **Astro 4.5.0** - Framework web moderno
- **Node.js Adapter** - Para server-side rendering
- **TypeScript** - Tipado estático
- **Cookie-based Auth** - Autenticación con cookies

## 📋 Requisitos

- Node.js v21.6.1 o superior
- npm o yarn

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/Finca-Esmeralda.git
cd Finca-Esmeralda
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

4. Editar `.env` con tus credenciales:

```env
USER_1_ID=1
USER_1_NAME=Tu Nombre
USER_1_EMAIL=tu@email.com
USER_1_PASSWORD=tu-password-seguro
USER_1_ROLE=user

USER_2_ID=2
USER_2_NAME=Admin
USER_2_EMAIL=admin@email.com
USER_2_PASSWORD=admin-password-seguro
USER_2_ROLE=admin
```

## 🏃 Ejecución

### Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

### Producción

```bash
npm run build
npm run preview
```

## 🔐 Autenticación

El sistema usa autenticación hardcodeada con dos usuarios configurables mediante variables de entorno:

- **Usuario regular**: Acceso a la página principal
- **Usuario admin**: Acceso al dashboard de administración en `/admin`

### Rutas protegidas:

- `/admin` - Dashboard de administración (requiere rol admin)
- `/api/gallery/upload` - Subir fotos (requiere rol admin)
- `/api/gallery/delete` - Eliminar fotos (requiere rol admin)

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes Astro
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Galeria.astro
│   └── ...
├── pages/             # Páginas y rutas
│   ├── index.astro    # Página principal
│   ├── login.astro    # Página de login
│   ├── admin.astro    # Dashboard admin
│   └── api/           # API endpoints
│       ├── auth/      # Autenticación
│       ├── gallery/   # Gestión de galería
│       └── users/     # Gestión de usuarios
├── config/            # Configuración
│   └── users.ts       # Configuración de usuarios
└── styles/            # Estilos globales
    └── global.css
```

## 🎨 Características

- ✅ Diseño responsive
- ✅ Autenticación con cookies
- ✅ Dashboard de administración
- ✅ Upload de imágenes
- ✅ Galería dinámica
- ✅ Roles de usuario (user/admin)

## 🔒 Seguridad

**IMPORTANTE**: El archivo `.env` contiene credenciales sensibles y **NO debe subirse a GitHub**.

- ✅ `.env` está en `.gitignore`
- ✅ `.env.example` es público con valores de ejemplo
- ✅ Cambia las credenciales por defecto antes de usar en producción

## 📝 Licencia

Este proyecto es privado y de uso exclusivo para Finca Esmeralda.
