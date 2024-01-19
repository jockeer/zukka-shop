# Descripcion

## Lenvantar en Desarrollo

1. Clonar el repo
2. Crear una copia del ```.env.template```, renombrarlo a ```.env``` y cambiar
las variables de entorno
3. instalar las dependencias ```npm install```
4. Levantar la base datos ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr el proyecto ```npm run dev```