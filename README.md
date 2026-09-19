# Respuestas de la Práctica 7

## 1. ¿Por qué esta interfaz no menciona Express, NestJS ni memoria?
Porque una interfaz dice **qué** se puede hacer, nunca **cómo**.

`MiembroRepository` es el contrato entre el Service y quien guarde los
datos. Tiene cinco métodos y ni una palabra sobre la tecnología.

No menciona Express ni NestJS porque el repositorio no sabe que lo
llaman desde una petición HTTP. No hay `req`, no hay `res`, no hay
códigos de estado. El mismo contrato serviría si lo llamaras desde una
tarea programada o desde la terminal.


## 2. ¿Qué palabra de esa clase es la que promete cumplir la interfaz?
La palabra es **`implements`**.

Es una promesa que se revisa al compilar. Si mañana le falta un método
o una firma no coincide, TypeScript reclama en esa línea exacta, antes
de que nadie ejecute nada.


## 3. ¿Por qué este archivo no sabe qué es una petición HTTP?
Porque HTTP es la forma de entrega, no parte del negocio.

Mira lo que **no** aparece en `miembros.service.ts`: ni `req`, ni
`res`, ni un 200, ni un 404, ni la palabra Express, ni un decorador de
ruta. Solo recibe datos simples (un número, un objeto) y devuelve datos
simples o `null`. Quién lo llamó le da igual.


## 4. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?
Porque `MiembrosService` es una **clase** y `MiembroRepository` es una
**interfaz**.

Una clase sobrevive a la compilación: en el archivo `.js` queda un
objeto de verdad. Como el proyecto tiene `emitDecoratorMetadata`
prendido, TypeScript escribe ahí la lista de los tipos del constructor.
Nest lee esa lista, encuentra `MiembrosService`, lo busca entre los
providers del módulo y lo entrega. Nadie tuvo que escribir un token
porque **la clase es su propio token**.

Una interfaz no sobrevive. En el `.js` no queda ni rastro. TypeScript
no tiene qué escribir y pone `Object`. Nest buscaría un provider
registrado como `Object` y fallaría.


## 5. ¿Qué prueba, en los hechos, que agregar Miembros no rompió nada de Inscripciones?
Funciona porque Miembros es un módulo aparte. Tiene sus propios
providers y su propio token, no comparte nada con `InscripcionesModule`
y no modifica ni un archivo suyo. El único archivo que tocan los dos es
`app.module.ts`, y nada más para agregar un nombre a la lista de
`imports`.


