/**
 * Esta función genera la ruta completa de un recurso estático (asset) en la aplicación,
 * considerando un posible prefijo de base path definido en las variables de entorno.
 * Esto es útil para manejar correctamente las rutas de los recursos cuando la aplicación
 * se despliega en diferentes entornos o subdirectorios.
 * 
 * @example
 * asset("/images/logo.png"); // Devuelve la ruta completa considerando el base path
 * 
 * @param path Ruta relativa del recurso estático.
 * @returns Ruta completa del recurso estático, incluyendo el base path si está definido.
 */
export function asset(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
}