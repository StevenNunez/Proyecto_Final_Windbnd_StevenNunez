/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

// Importación de datos y funciones 
import { stays } from './stays.js';
import { traerSkeleton, Alojamientos, adultosCantidad, niñosCantidad, total, autocompletado } from './utils.js';

// Selección de elementos del DOM
const contenedor = document.querySelector('#alojamientos'); // Contenedor de los alojamientos
const ciudadMostrar = document.querySelector('#ciudadMostrar'); // Título de los resultados
const numberCiudad = document.querySelector('#numberCiudad'); // Contador de alojamientos
const btnModal = document.querySelectorAll('.btnModal'); // Inputs que abren el modal
const btnCerrarModal = document.querySelector('#closeModal'); // Botón para cerrar el modal
const modalPadre = document.querySelector('.modalPadre'); // Contenedor del modal
const locationCity = document.querySelector('#location'); // Input de ubicación
const gest = document.querySelector('.totalguest'); // Span del total de huéspedes
const botonEnviar = document.querySelector('#botonEnviar'); // Botón de búsqueda del modal
const superHostFilter = document.querySelector('#superHostFilter'); // Filtro de Super Host
const ratingFilter = document.querySelector('#ratingFilter'); // Filtro de calificación
const ciudades = ['Helsinki', 'Turku', 'Oulu', 'Vaasa']; // Lista de ciudades para autocompletado
const suggestions = document.querySelector('#suggestions'); // Lista de sugerencias de ciudades

// Mostrar skeleton loader al cargar la página
traerSkeleton(contenedor, stays);

// Cargar alojamientos después de 200ms
setTimeout(() => {
  contenedor.innerHTML = '';
  Alojamientos(stays, contenedor);
}, 200);

// Variable para rastrear el botón oculto al abrir el modal
let botonOculto = null;

// Abrir el modal al hacer clic en los inputs de búsqueda
btnModal.forEach(element => {
  element.addEventListener('click', function () {
    modalPadre.classList.remove('hidden');
    element.classList.add('hidden');
    botonOculto = element;
  });
});

// Función para cerrar el modal
function cerrarModal() {
  btnCerrarModal.addEventListener('click', function () {
    modalPadre.classList.add('hidden');
    if (botonOculto) {
      botonOculto.classList.remove('hidden');
      botonOculto = null;
    }
  });
}
cerrarModal();

// Inicializar contadores de adultos, niños y total de huéspedes
adultosCantidad();
niñosCantidad();
total();

// Función para filtrar alojamientos según los criterios seleccionados
function filtrarAlojamientos() {
  const ciudad = locationCity.value.trim().toLowerCase();
  const cantidadHuespedes = Number(gest.textContent.trim());
  const superHostValue = superHostFilter.value;
  const ratingValue = Number(ratingFilter.value);

  let filteredStays = stays;

  // No mostrar resultados para el filtro de 3+ estrellas
  if (ratingValue === 3) {
    filteredStays = [];
  } else {
    filteredStays = stays.filter(stay => {
      const coincideCiudad = ciudad === '' || stay.city.toLowerCase().includes(ciudad);
      const coincideHuespedes = cantidadHuespedes === 0 || stay.maxGuests === cantidadHuespedes;
      const coincideSuperHost = superHostValue === 'all' || (superHostValue === 'super' && stay.superHost);
      const coincideRating = ratingValue === 0 || stay.rating >= ratingValue;
      return coincideCiudad && coincideHuespedes && coincideSuperHost && coincideRating;
    });
  }

  // Limpiar el contenedor y renderizar los alojamientos filtrados
  contenedor.innerHTML = '';
  Alojamientos(filteredStays, contenedor);
  numberCiudad.textContent = `${filteredStays.length} stays`;

  // Mostrar mensaje si no se encuentran alojamientos
  if (filteredStays.length === 0) {
    contenedor.innerHTML = '<p class="text-center text-gray-500 text-lg ml-5">No stays found matching the selected criteria :).</p>';
  }
}

// Aplicar filtros al hacer clic en el botón de búsqueda del modal
botonEnviar.addEventListener('click', function () {
  modalPadre.classList.add('hidden');
  if (botonOculto) {
    botonOculto.classList.remove('hidden');
    botonOculto = null;
  }
  filtrarAlojamientos();
});

// Aplicar filtros al cambiar las opciones de Super Host o rating
superHostFilter.addEventListener('change', filtrarAlojamientos);
ratingFilter.addEventListener('change', filtrarAlojamientos);

// Inicializar autocompletado para el input de ubicación
autocompletado(locationCity, ciudades, suggestions);