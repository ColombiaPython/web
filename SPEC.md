# Arquitectura del sitio web de Python Colombia

## Barra superior (Header)

```
-----------------------------------------------------------------------------------------
Logo | Comunidades | Eventos | Noticias | Blog | Podcasts | Tienda | Iniciar sesión
-----------------------------------------------------------------------------------------
```

* **Logo**

  * Redirige siempre al Inicio.

* **Tienda**

  * Botón destacado (Call To Action).
  * Puede tener un icono de carrito.

* **Iniciar sesión**

  * Si el usuario está autenticado:

    * Mi perfil
    * Mis publicaciones
    * Panel Administrativo (según permisos)
    * Cerrar sesión

---

# Inicio (Home)

La página principal debe responder inmediatamente:

> ¿Qué es Python Colombia y qué está pasando actualmente?

## 1. Hero

Un componente principal con:

* Imagen o ilustración
* Slogan

Ejemplo

> La comunidad oficial de Python en Colombia.
>
> Aprende, comparte y construye con miles de desarrolladores.

Botones:

* Únete a la comunidad
* Próximos eventos

---

## 2. Próximos eventos

Mostrar los próximos eventos.

Información:

* Ciudad
* Fecha
* Lugar
* Cupos
* Botón "Ver evento"

---

## 3. Comunidades

Mapa de Colombia o tarjetas por ciudad.

Ejemplo

```
Bogotá
450 miembros

Medellín
280 miembros

Cali
180 miembros

Barranquilla
95 miembros
```

Cada comunidad tendrá:

* Descripción
* Organizadores
* Próximos eventos
* Miembros
* Redes sociales

---

## 4. Historia

Una sección sobre:

* Nacimiento de Python Colombia
* Objetivos
* Misión
* Organización
* Cómo participar

---

## 5. Newsletter

Formulario simple

```
Nombre

Correo

[Suscribirme]
```

Explicar:

* Noticias
* Eventos
* Convocatorias
* Podcast
* Blogs destacados

---

## 6. Últimas noticias

Mostrar las últimas publicaciones.

Cada tarjeta:

* Imagen
* Categoría
* Fecha
* Autor
* Resumen
* Leer más

---

## 7. Blogs destacados

Últimos artículos escritos por la comunidad.

Mostrar:

* Autor
* Tiempo de lectura
* Etiquetas
* Likes
* Comentarios

---

## 8. Últimos podcasts

Tarjetas con:

* Invitado
* Duración
* Plataformas (Spotify, YouTube, etc.)
* Escuchar

---

## 9. Patrocinadores

Empresas que apoyan la comunidad.

Ejemplo:

* Microsoft
* JetBrains
* PyCharm
* AWS
* Google Cloud

---

## 10. Footer

* Acerca de
* Código de conducta
* Contacto
* GitHub
* Discord
* LinkedIn
* YouTube
* Política de privacidad

---

# Comunidades

Listado de comunidades por ciudad.

Cada comunidad tendrá:

* Banner
* Descripción
* Organizadores
* Número de miembros
* Próximos eventos
* Historial de eventos
* Fotos
* Patrocinadores locales

---

# Eventos

Filtros:

* Ciudad
* Fecha
* Tipo
* Virtual
* Presencial

Cada evento tendrá:

* Agenda
* Speakers
* Patrocinadores
* Registro
* Materiales
* Fotografías
* Grabaciones

Separar:

* Próximos eventos
* Eventos pasados

---

# Noticias

Administradas por la célula de Newsletter.

Cada noticia incluye:

* Autor
* Fecha
* Categoría
* Imagen
* Contenido
* Comentarios (opcional)

---

# Blog

Contenido generado por la comunidad.

Si el usuario inicia sesión:

```
[ Publicar artículo ]
```

Flujo

```
Borrador
      ↓
En revisión
      ↓
Aprobado
      ↓
Publicado
```

Características:

* Markdown
* Resaltado de código
* Imágenes
* Etiquetas
* Series de artículos
* Perfil del autor

---

# Podcasts

Administrados por la célula de Podcast.

Cada episodio:

* Invitados
* Resumen
* Recursos
* Plataformas
* Video
* Audio

---

# Tienda

Productos oficiales.

Categorías

* Camisetas
* Hoodies
* Gorras
* Mugs
* Stickers
* Botellas
* Cuadernos
* Mouse pads

Cada producto:

* Variantes
* Tallas
* Inventario
* Precio
* Galería

---

# Autenticación

Registro mediante:

* GitHub
* Google
* Microsoft
* Correo electrónico

Al crear la cuenta:

```
Pendiente de aprobación
```

Un moderador aprueba el acceso.

Roles posibles:

* Usuario
* Autor
* Moderador
* Administrador
* Super Administrador

---

# Panel Administrativo

## Dashboard

* Usuarios registrados
* Suscriptores al newsletter
* Próximos eventos
* Publicaciones pendientes
* Estadísticas del sitio

---

## Newsletter

* CRUD de suscriptores
* Importar/Exportar
* Segmentación
* Historial de campañas

---

## Comunidades

CRUD de:

* Ciudades
* Organizadores
* Redes sociales
* Información
* Logos

---

## Eventos

CRUD completo.

Además:

* Registro de asistentes
* Speakers
* Agenda
* Patrocinadores
* Fotografías

---

## Noticias

CRUD completo.

Incluye:

* Programar publicación
* Categorías
* Destacadas

---

## Blogs

Flujo editorial completo.

Estados:

* Borrador
* En revisión
* Requiere cambios
* Aprobado
* Publicado
* Archivado

---

## Podcasts

CRUD de episodios.

Incluye:

* Plataformas
* Invitados
* Recursos
* Transcripción

---

## Tienda

* Productos
* Categorías
* Inventario
* Pedidos
* Descuentos
* Cupones

---

## Usuarios

Gestión de:

* Usuarios
* Roles
* Permisos
* Solicitudes de acceso
* Suspensiones

---

## Configuración

* Redes sociales
* Logos
* Banners
* SEO
* Analytics
* Integraciones (YouTube, Spotify, GitHub, Mailchimp/Brevo, etc.)

## Funcionalidades adicionales recomendadas

Para convertir el sitio en el punto central de la comunidad, incluiría además:

* **Calendario global** con todos los eventos de Python Colombia.
* **Directorio de speakers**, donde los miembros puedan ofrecer charlas y talleres.
* **Directorio de empresas patrocinadoras** y organizaciones aliadas.
* **Página de voluntariado**, para unirse a células de trabajo (Newsletter, Podcast, Eventos, Diseño, Web, etc.).
* **Sistema de perfiles públicos**, donde cada miembro pueda mostrar su biografía, ciudad, redes sociales y publicaciones.
* **Página de recursos**, con enlaces a documentación, tutoriales, grabaciones de eventos y material de aprendizaje.
* **Galería multimedia** con fotografías y videos de eventos anteriores.
* **SEO optimizado**, con URLs amigables (`/comunidades/bogota`, `/eventos/pyday-medellin-2026`, `/blog/introduccion-a-fastapi`) y metadatos para compartir en redes sociales.
* **Buscador global**, capaz de encontrar comunidades, eventos, noticias, blogs, podcasts y miembros desde una única barra de búsqueda.
