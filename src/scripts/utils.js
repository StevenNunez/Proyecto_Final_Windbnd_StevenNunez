/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */

// Variables globales para los contadores de adultos y niños
let cantidadAdul = 0;
let contador = 0;

// Función para mostrar un skeleton loader mientras cargan los alojamientos
export function traerSkeleton(contenedor, stays) {
  contenedor.innerHTML = '';
  for (let i = 0; i < stays.length; i++) {
    contenedor.innerHTML += `
      <a href="#" class="mb-[50px] block w-[337px] h-[223.26px] bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div role="status" class="w-[337px] h-[223.26px] animate-pulse">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span class="sr-only">Loading...</span>
        </div>
      </a>
    `;
  }
}

// Función para renderizar los alojamientos en el contenedor
export function Alojamientos(listastays, contenedor) {
  contenedor.innerHTML = '';
  listastays.forEach(element => {
    contenedor.innerHTML += `
      <div class="flex flex-col justify-center pb-[20px] gap-1">
        <div class="w-[337px] h-[223.26px]">
          <img class="w-[337px] h-[223.26px] rounded-2xl" src="${element.photo}" alt="${element.title}" />
        </div>
        <div class="flex justify-between">
          <div class="flex items-center gap-1">
            ${element.superHost ? `<span class="text-[10px] border border-black px-2 rounded-md font-semibold">SUPER HOST</span>` : ''}
            <span class="text-[12px]">${element.type}${element.beds !== null ? ` · ${element.beds} beds` : ''}</span>
          </div>
          <div class="flex items-center">
            <svg class="w-[12px]" xmlns="http://www.w3.org/2000/svg" fill="#eb5757" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.563 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
            </svg>
            <span class="text-[12px]">${element.rating}</span>
          </div>
        </div>
        <div>
          <p class="font-semibold">${element.title}</p>
        </div>
      </div>
    `;
  });
}

// Función para actualizar el total de huéspedes
export function total() {
  const totalguest = document.querySelector('.totalguest');
  totalguest.textContent = cantidadAdul + contador;
}

// Función para manejar el contador de adultos
export function adultosCantidad() {
  const btnmasAdulto = document.querySelector('.btn-masa');
  const btnmenosAdulto = document.querySelector('.btn-menosa');
  const cantidadAdultos = document.querySelector('.cantidadAdultos');

  btnmasAdulto.addEventListener('click', function () {
    cantidadAdul += 1;
    cantidadAdultos.textContent = cantidadAdul;
    total();
  });

  btnmenosAdulto.addEventListener('click', function () {
    if (cantidadAdul > 0) {
      cantidadAdul -= 1;
      cantidadAdultos.textContent = cantidadAdul;
      total();
    }
  });
}

// Función para manejar el contador de niños
export function niñosCantidad() {
  const btnmasNiño = document.querySelector('.btn-masn');
  const btnmenosNiño = document.querySelector('.btn-menosn');
  const cantidadNiños = document.querySelector('.cantidadniños');

  btnmasNiño.addEventListener('click', function () {
    contador += 1;
    cantidadNiños.textContent = contador;
    total();
  });

  btnmenosNiño.addEventListener('click', function () {
    if (contador > 0) {
      contador -= 1;
      cantidadNiños.textContent = contador;
      total();
    }
  });
}

// Función para autocompletado de ciudades
export function autocompletado(locationCity, ciudades, suggestions) {
  locationCity.addEventListener('input', () => {
    const texto = locationCity.value.toLowerCase().trim();
    suggestions.innerHTML = '';

    if (texto === '') return;

    const resultados = ciudades.filter(ciudad => ciudad.toLowerCase().includes(texto));

    resultados.forEach(ciudad => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
        </svg>
        ${ciudad}, Finland
      `;
      li.classList.add('cursor-pointer', 'p-2', 'hover:bg-gray-200', 'flex', 'items-center', 'gap-2', 'rounded', 'absolute', 'bg-white');
      li.addEventListener('click', () => {
        locationCity.value = ciudad;
        suggestions.innerHTML = '';
      });
      suggestions.appendChild(li);
    });
  });
}