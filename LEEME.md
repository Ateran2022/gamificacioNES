# Portal de Recursos por Área — cómo publicarlo

## 1. Subir estos archivos a GitHub
1. Entra a tu repositorio: https://github.com/Ateran2022/gamificacioNES
2. Haz clic en "uploading an existing file" (lo viste en la página de inicio del repo).
3. Arrastra TODA la carpeta `portal-netlify` completa (o su contenido: `index.html`, `netlify.toml`, `package.json` y la carpeta `netlify/`) a esa ventana.
4. Baja y dale clic en "Commit changes".

## 2. Conectar el repositorio con Netlify
1. Entra a tu cuenta de Netlify: https://app.netlify.com
2. Clic en "Add new site" → "Import an existing project".
3. Elige GitHub, autoriza el acceso, y selecciona el repositorio `gamificacioNES`.
4. Netlify va a detectar automáticamente `netlify.toml`. No cambies nada, solo dale "Deploy site".
5. En un par de minutos te dará una URL como `https://algo-random.netlify.app` — esa es tu portal.

## 3. Cambiar las claves de cada área
Abre el archivo `index.html`, busca la palabra `AREAS` cerca del final, y donde dice `pin:"1234"` cambia el número por la clave que quieras para cada área. Guarda y vuelve a subir el archivo a GitHub — Netlify se actualiza solo.

## Cómo funciona de ahí en adelante
- Los profes solo necesitan el link del sitio. Nunca crean cuenta, nunca instalan nada.
- Cada área tiene su clave para entrar.
- Dentro de su área, un profe puede subir un archivo .html (el que genera Gemini) y el sitio le da un link único al instante, tipo `tu-sitio.netlify.app/r/x7k2p9`.
- Ese link se puede compartir directo con los estudiantes — no necesitan clave, ni pasar por el portal.
