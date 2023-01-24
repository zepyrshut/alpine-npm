Ese proyecto tiene como objetivo comprender el funcionamiento de Alpine

## Introducción

Si bien, se puede hacer mediante script CDN, es mucho más facil organizar
el código fuente mediante módulos y da un enfoque más robusto, al igual
que con Tailwind, se puede importar por CDN, si se hace mediante módulo, 
se aprovecha el potencial completo como purgado de código, eliminado 
elementos que no utiliza.

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
e incluso dos funciones. Pues la función ```init()``` pertenece a la
directiva x-init y será lo primero que se ejecuta cuando la función
```fetchSomeData()``` es llamada desde la directiva x-data. Tal que el
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
````
Observa que desde ```x-data"fetchSomeData"``` obtiene todos los datos,
la función ```init()``` será encargada de extraer elementos desde la API
y será asociada a ```data```, con lo cual se puede usar para iterarse en
```x-for="element in data"```.

Se podría mejorar añadiendo elementos como ```isLoading``` o ```isError```.

## x-show y x-if

La dinámica de ambas directivas son las mismas, mostrar o no un elemento
en la vista, sin embargo el funcionamiento es diferente en cada una. Con
x-show muestra y oculta elementos añadiendo funcionalidades CSS, no se
elimina desde el DOM, y x-if hace lo mismo, pero eliminándose o añadiéndose
al DOM. La directiva x-show funciona con transiciones y animaciones
mientras con la otra no lo permite.