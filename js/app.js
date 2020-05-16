//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');

//Listeners
//const cargarEventListeners = 
(() => {
  //Se dispara función al presionar "Agregar al carrito"
  cursos.addEventListener('click', comprarCurso);

  //Se dispara función al presionar la X en el carrito
  carrito.addEventListener('click', eliminarCurso);
  
})();
//cargarEventListeners();


//Funciones
//Función que añade el curso al carrito en el DOM
function comprarCurso(e) {
  e.preventDefault();
  //Comprueba si se dió click en el botón agregar carrito (Delegation)
  if (e.target.classList.contains('agregar-carrito')) {
    curso = e.target.parentElement.parentElement;
    //ejecuta función para leer los componentes del curso ('card) enviando el elemento como parámetro
    leerDatosCurso(curso);
  }; 
}

//Función lee datos del curso
function leerDatosCurso(curso) {
  
  //Se almacenan los datos del curso en un objeto
  infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
  }
  insertarCarrito(infoCurso);
}

//Función que muestra el curso seleccionado en el carrito
function insertarCarrito(infoCurso) {
  console.log(infoCurso);

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${infoCurso.imagen}" width="100" />
    </td>
    <td>${infoCurso.titulo}</td>
    <td>${infoCurso.precio}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</td>
  `;
  //Se agregar a la lista
  listaCarrito.appendChild(row);
}

//Función que quita a curso de carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();

  let curso;
  if (e.target.classList.contains('borrar-curso')) {
    //remueve el curso del carrito a través de un delegation
    e.target.parentElement.parentElement.remove();
  }; 
}