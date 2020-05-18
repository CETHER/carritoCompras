//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Listeners
//const cargarEventListeners = 
(() => {
  //Se dispara función al presionar "Agregar al carrito"
  cursos.addEventListener('click', comprarCurso);

  //Se dispara función al presionar la X en el carrito
  carrito.addEventListener('click', eliminarCurso);

  //Se dispara la función al presionar el botón de vaciar carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  //Al cargar DOM, mostrar datos de LS
  document.addEventListener('DOMContentLoaded', leerLS);
  
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

  //Se lanza la función que guarda en LS
  guardarCursoLS(infoCurso);
}


//Función que quita a curso de carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();

  let curso, cursoId;
  if (e.target.classList.contains('borrar-curso')) {
    //remueve el curso del carrito a través de un delegation
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('data-id');
    console.log(cursoId);
    //Se lanza la función que elimina curso de LS
    eliminarCursoLS(cursoId);
  };
}


//Función que vacía todos los cursos del carrito en el DOM
function vaciarCarrito() {
  //listaCarrito.innerHTML = '';
  // Forma recomendada
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
  //Vaciar Local Storage
  vaciarCarritoLS();
  
  return false;
}


//Funciones de Local Storage
function guardarCursoLS(infoCurso) {
  let cursos;
  //Se obtiene el arreglo de cursos que hay en LS
  cursos = obtenerCursosLS();
  //El curso se agrega al arreglo que se enviará al LS
  cursos.push(infoCurso);
  //Se almacena el arreglo en LS
  localStorage.setItem('cursos', JSON.stringify(cursos));
}

//Comprobamos si hay elementos en Local Storage
function obtenerCursosLS() {
  let cursosLS

  if (localStorage.getItem('cursos') === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'))
  }
  return cursosLS;
}

//Imprime los cursos de LocalStorage en el carrito
function leerLS() {
  let cursosLS
  cursosLS = obtenerCursosLS();
  cursosLS.forEach((curso) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${curso.imagen}" width="100" />
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</td>
    `;
    //Se agregar a la lista
    listaCarrito.appendChild(row);
  });
}


//Función que elimina cruso de Local Storage
function eliminarCursoLS(curso) {
  let cursosLS;
  cursosLS = obtenerCursosLS();
  cursosLS.forEach((cursoLS, index) => {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });
  //Se envía el arreglo sin el Item al LS
  localStorage.setItem('cursos', JSON.stringify(cursosLS));
}


//Elimina todos los cursos del LS
function vaciarCarritoLS() {
  localStorage.clear();
}