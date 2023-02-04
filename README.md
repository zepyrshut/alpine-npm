# Introducción

Ese proyecto tiene como objetivo comprender el funcionamiento de Alpine,
Node.js, TailwindCSS, Prettier y ESLint, en JavaScript. Puede diferir
ligeramente si se requiere programar en TypeScript.

Este documento da por hecho que el lector ya tiene un conocimiento
más que básico sobre las herramientas y tecnologías esenciales para el
desarrollo _front-end_.

# Tabla de contenidos

1. Vite
2. TailwindCSS
3. ESLint
4. Standard
5. Prettier
   1. Prettier y TailwindCSS
   2. Prettier y atributos HTML
6. Ganchos _pre-commit_
   1. Lint-staged
   2. Husky
7. Alpine JS
   1. Directivas
      1. x-data y x-init
      2. x-show y x-if
      3. x-effect
   2. Magias
      1. $dispatch
8. Agradecimientos y fuentes

# Vite

Es una herramienta muy útil para el desarrolador _front-end_ en el que
hace un compilado de todo el proyecto, así como sus dependencias en un
solo archivo JS y otro archivo CSS, acompañado de sus archivos HTML.

La gran ventaja frente a sus competidores es la velocidad que tiene
para empaquetar y poner a funcionar un proyecto, usa _esbuild_, que es
entre 10 y 100 veces más rápido que otros empaquetadores.

Además incluye facilidades en el desarrollo como el uso de variables de
entorno sin necesidad de añadir más dependencias.

# TailwindCSS

Es un _framework_ CSS orientado a utilidad, en el que se pueden escribir
clases CSS directamente en el HTML. Hay varios pasos, para ello sólo hay
que seguir esta guía:

[Guía de instalación TailwindCSS en Vite](https://tailwindcss.com/docs/guides/vite).

# ESLint

Herramienta que analiza el código en búsqueda de problemas que pueden
ser de sintaxis, detección de malas prácticas como código duplicado o
abuso de cadena de caracteres entre otras cosas. Se instala ejecutando
el comando:

> ` npm init @eslint/config`

La configuración es muy sencilla, que puede variar en cada proyecto,
se recomienda encarecidamente leer cada paso del manual y elegir la
opción adecuada, para este proyecto ha sido la siguiente:

- Cosas a analizar: _To check syntax, find problems and enforce code
  style_.
- Uso de los módulos JS: _JavaScript modules (import/export)_.
- Pregunta por el _framework_: _None of these_.
- Pregunta si se usa _TypeScript_: _No_.
- Entorno de ejecución: _Node_.
- Uso de estilos populares: _Standard_.
- Formato de fichero de configuración: _JSON_

Para automarizar el formateo de código cada vez que se guarda el
documento, abrir el archivo `settings.json` (Paleta de comandos seguido
de "open settings .json") y añadir estas líneas:

```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```

Y tener activada el formato de código al guardar. Sin embargo, en el
apartado Ganchos pre-commit hay elementos interesantes.

Listo.

# Standard

Es una librería que funciona gracias a ESLint, que las reglas de formato
de código se adhiere a -intento- un estándar de JS.

La parte positiva que muchas empresas y organizaciones apoyan y confían
en el uso de _Standard_.

Se instala con el comando:

> `npm install --save-dev standard`

Y se ejecuta con el comando:

> `npx standard --fix`

Es necesario, si se va a instalar Prettier, añadir el fichero
`.prettierignore` y escribir en él `*.js` para que no se pisen entre
el formateador ESLint y Prettier.

# Prettier

Es una herramienta que da formato a los archivos para seguir todos unas
mismas reglas y formatos. Se instala ejecutando el comando:

> `npm install prettier`

Hay varias formas de ser configurado y ejecutado, en este caso es
configurado mediante el archivo ubicado en la carpeta raíz del proyecto
`.prettierrc.json` y ejecutado mediante el comando:

> `npx prettier --write <file.ext>`

Aunque dejo una aclaración: por comodidad puede ser también ejecutado
mediante la extensión con el mismo nombre en el propio IDE, la
extensión puede tener sus propios archivos de configuración globales o
bien, leer el archivo de configuración en el propio proyecto, siendo
ésta última la que tiene preferencia.

De momento para todos y cada uno de los lenguajes se usa la
configuración por defecto.

## Prettier y TailwindCSS

Hay un _plugin_ que se integra con Prettier que consiste en ordenar las
clases Tailwind, ordenándose y agrupándose. En este proyecto ya viene
configurado, pero para un próximo proyecto basta con añadir Prettier y
el dicho _plugin_.

> ` npm install -D prettier prettier-plugin-tailwindcss`

Para ejecutarse basta con guardar el proyecto o ejecutar el comando
mencionado en el apartado anterior.

## Prettier y atributos HTML

Hay otro _plugin_ que consiste en ordenar los atributos HTML, cumple
con su función y no tiene mucho misterio.

> `npm install prettier-plugin-organize-attributes`

El proyecto debe existir el archivo `.prettierrc`, y en él, incluir la
siguiente línea para una configuración por defecto:

```
{
"attributeGroups": ["^class$", "^(id|name)$", "$DEFAULT", "^aria-"]
}
```

En él se puede añadir elementos en expresión regular y se cumplen
según las coincidencias.

También existen configuraciones hechas para React, Vue y Angular.

# Ganchos _pre-commit_

Es un sistema que automatiza el proceso de la comprobación de código y
el formato antes de hacer un _commit_ a un repositorio, en caso de duda
o error al ejecutarse el gancho, se cancela el proceso y obliga al
usuario arreglar dichos problemas. Para ello se necesita tener instalado
y configurado ESLint y Prettier. Las herramientas que toca son _Husky_ y
_Lint-staged_.

## Lint-staged

Obliga a Husky a analizar solamente las líneas de código realizadas por
el desarrollador al momento de hacer el _commit_ y no todo o todos los
archivos.

> `npm install lint-staged --save-dev`

No hay que hacer nada más.

## Husky

Contiene una serie de _scripts_ que se ejecutan al hacer un _commit_,
cada _script_ contiene toda la información necesaria para analizar con
ESLint y darle formato al código con Prettier.

> `npm install husky --save-dev`

Una vez instalado, hay que añadir las siguientes lineas al fichero
`package.json`.

```
"lint-staged": {
  "src/**/*.{html,scss}": [
    "prettier --write"
  ],
  "src/**/*.{js,ts}": [
    "eslint --fix"
  ]
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

El comando _lint-staged_ ejecuta el comando `prettier --write`, que
dará formato a todo código fuente que contengan la extensiones `html` y
`scss`, personalizar al gusto del desarrollador, y, posteriormente, el
comando `eslint --fix`, que pasará ESLint en busca de fallo y lo
corrige de forma automática si procede.

Ejecutar el siguiente comando para generar la serie de _scripts_ de
_Husky_.

> `npm pkg set scripts.prepare="husky install"`

> `npm run prepare`

¡Listo! Ahora, cuando hagas un _commit_, antes se analiza todo el
código fuente, y se formatea.

# Alpinejs

Alpine tiene como objetivo ofrecer una librería muy ligera y con
posibilidad de añadir funcionalidades mediante plugins.

Y ahora una breve descripción de las directivas y su relación entre
ellas.

## Directivas

Usadas en el proyecto:

- x-data
- x-text
- x-model
- x-if
- x-show

### x-data y x-init

x-data: la más importante de todas, la que hace determinar que un
fragmento HTML es tratado como un componente de Alpine. Puede contener
lo que desee, desde datos simples hasta arrays y funciones.

x-init: si contiene una función, será ejecutada antes de procesar el
componente, un ejemplo de uso es solicitar datos a una API y guardarlo
en la directiva x-data para mostrarse por pantalla.

Tanto x-data como x-init está estrechamente relacionadas, pues se
utilizan ambas para inicializar un elemento y almacenarse. Un ejemplo:

```
export function fetchSomeData() {
  return {
    title: "Some data",
    data: [],
    reload() {
      sessionStorage.removeItem("data");
      this.data = [];
      this.init();
    },
    init() {
      const data = JSON.parse(sessionStorage.getItem("data"));
      if (data) {
        this.data = data;
        return;
      }
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => {
          this.data = json;
          sessionStorage.setItem("data", JSON.stringify(json));
        });
    },
  };
}
```

Es una simple función en la que retorna un objeto con varios atributos
e incluso dos funciones. Pues la función `init()` pertenece a la
directiva x-init y será lo primero que se ejecuta cuando la función
`fetchSomeData()` es llamada desde la directiva x-data. Tal que el
fragmento quedaría así:

```
  <div x-data="fetchSomeData">
    <template x-for="element in data">
      <div x-text="element.title"></div>
    </template>

    <button type="button" x-on:click="reload">
      Reload
    </button>
  </div>
```

Observa que desde `x-data"fetchSomeData"` obtiene todos los datos,
la función `init()` será encargada de extraer elementos desde la API
y será asociada a `data`, con lo cual se puede usar para iterarse en
`x-for="element in data"`.

Se podría mejorar añadiendo elementos como `isLoading` o
`isError`.

### x-show y x-if

La dinámica de ambas directivas son las mismas, mostrar o no un elemento
en la vista, sin embargo el funcionamiento es diferente en cada una. Con
x-show muestra y oculta elementos añadiendo funcionalidades CSS, no se
elimina desde el DOM, y x-if hace lo mismo, pero eliminándose o
añadiéndose al DOM. La directiva x-show funciona con transiciones y
animaciones mientras con la otra no lo permite.

### x-effect

Se ejecuta inmediatamente después de que cualquier valor ubicado en
`x-data` cambie.

## Magias

Usadas en el proyecto:

- $dispatch

### $dispatch

Es un atajo bastante considerable para despachar eventos en el
navegador. Supongamos que está el caso de se quiera ejecutar un evento
personlizado después de hacer una acción.

Basta con poner el nombre al nuevo evento:
`@nombre-nuevo-evento.window="nombreFuncionAsociada"` y para despachar
el evento se le llama con
`$dispatch('nombre-nuevo-evento', nuevosValores)`, tambén se puede
ejecutar el evento de forma tradicional con
`window.dispatchEvent(new Event("nombre-nuevo-evento"))`. En el código
viene bien representado el ejemplo.

# Agradecimientos y fuentes

Este proyecto no hubiese sido posible sin estos usuarios:

- [Danny St. Pierre](https://codepen.io/bloqhead/pen/wvxoJKQ) - El
  concepto de _$dispatch_ y la comunicación entre un componente y otro.
- [Raymond Camden](https://www.raymondcamden.com/2022/05/02/building-table-sorting-and-pagination-in-alpinejs) - Ordenamiento y
  paginación de tablas.
- [HyperUI](https://www.hyperui.dev/) - Biblioteca _open source_ de
  componentes TailwindCSS.
- [HyperJS](https://js.hyperui.dev/) - Biblioteca _open source_ de
  componentes AlpineJS con TailwindCSS.
- [StandardJS](https://standardjs.com/) - Convenciones para normalizar
  el formato de código JavaScript.
- [Organize attributes](https://www.npmjs.com/package/prettier-plugin-organize-attributes)
  \- Plugin para ordenar los atributos HTML.
- [Automatically formatting and cleaning code on commit](https://blogs.halodoc.io/automatically-formatting-and-beautifying-code-on-commit/) - Tutorial
  para el uso de ganchos _pre-commits_.
- [Install TailwindCSS with Vite](https://tailwindcss.com/docs/guides/vite)
  \- Instalación de TailwindCSS en Vite.
