# Introducción

Ese proyecto tiene como objetivo comprender el funcionamiento de Alpine,
Node.js, TailwindCSS y Prettier.

Este documento da por hecho que el lector ya tiene un conocimiento
más que básico sobre las herramientas y tecnologías esenciales para el
desarrollo _front-end_.

# Tabla de contenidos

1. Vite
2. ESLint
3. Prettier
   1. Prettier y TailwindCSS
4. Alpine JS
   1. x-data y x-init
   2. x-show y x-if

# Vite

Es una herramienta muy útil para el desarrolador _front-end_ en el que
hace un compilado de todo el proyecto, así como sus dependencias en un
solo archivo JS y otro archivo CSS, acompañado de sus archivos HTML.

La gran ventaja frente a sus competidores es la velocidad que tiene
para empaquetar y poner a funcionar un proyecto, usa _esbuild_, que es
entre 10 y 100 veces más rápido que otros empaquetadores.

Además incluye facilidades en el desarrollo como el uso de variables de
entorno sin necesidad de añadir más dependencias.

# ESLint

Herramienta que analiza el código en búsqueda de problemas que pueden
ser de sintaxis, detección de malas prácticas como código duplicado o
abuso de cadena de caracteres entre otras cosas. Se instala ejecutando
el comando:

> ` npm init @eslint/config`

La configuración es muy sencilla, que puede variar en cada proyecto,
se recomienda encarecidamente leer cada paso del manual y elegir la
opción adecuada, para este proyecto ha sido la siguiente:

- Cosas a analizar: _To check syntax and find problems_.
- Uso de los módulos JS: _JavaScript modules (import/export)_.
- Pregunta por el _framework_: _None of these_.
- Pregunta si se usa _TypeScript_: _No_.
- Entorno de ejecución: _Node_.
- Formato de fichero de configuración: _JSON_

Listo.

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

Para la comodida absoluta, se puede configurar que el comando sea
ejecutado cada vez que se guarde el fichero. Estas opciones se deja a
elección del programador, pero para un proyecto en grupo sería
conveniente tenerlo activado y así dar el formato antes de hacer la
confirmación y subida al repositorio.

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

# Alpinejs

Alpine tiene como objetivo ofrecer una librería muy ligera y con
posibilidad de añadir funcionalidades mediante plugins.

Y ahora una breve descripción de las directivas y su relación entre
ellas.

## x-data y x-init

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

## x-show y x-if

La dinámica de ambas directivas son las mismas, mostrar o no un elemento
en la vista, sin embargo el funcionamiento es diferente en cada una. Con
x-show muestra y oculta elementos añadiendo funcionalidades CSS, no se
elimina desde el DOM, y x-if hace lo mismo, pero eliminándose o
añadiéndose al DOM. La directiva x-show funciona con transiciones y
animaciones mientras con la otra no lo permite.

## x-efect

Se ejecuta inmediatamente después de que cualquier valor ubicado en
`x-data` cambie.
