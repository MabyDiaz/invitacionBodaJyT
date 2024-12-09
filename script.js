/* Intro */
function animar() {
  document.body.style.overflow = 'auto';
  document.getElementById('top').classList.add('up');
  document.getElementById('bottom').classList.add('down');
  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
  }, 1000);

  const audio = document.getElementById('player');
  audio.play().catch((error) => {
    console.warn('Error al intentar reproducir el audio:', error);
  });

  const button = document.getElementById('button');
  button.innerHTML =
    "<div class='icon'><img src='./img/play.gif' alt='Play Icon'/></div>";
}

//------------------------------------------------------------------------
/* Portada*/
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.fotos-portada img');
  const audio = document.getElementById('player');
  const button = document.getElementById('button');
  let currentIndex = 0;

  // Slider de imágenes
  function changeImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }
  setInterval(changeImage, 3000);
  images[currentIndex].classList.add('active');

  // Control de reproducción (Play/Pause)
  button.addEventListener('click', function () {
    if (audio.paused) {
      audio.play();
      button.innerHTML =
        "<div class='icon'><img src='./img/play.gif' alt='Play Icon'/></div>";
    } else {
      audio.pause();
      button.innerHTML =
        "<div class='icon'><img src='./img/pause.png' alt='Pause Icon'/></div>";
    }
  });

  //------------------------------------------------------------------------
  // Confirmar Asistencia
  const modal = document.getElementById('confirm');
  const openModal = document.querySelector('.modal-button');
  const closeModalConfirm = document.querySelector('.closeModalConfirm');

  // Abrir el modal
  openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // Cerrar el modal al hacer clic en la X
  if (closeModalConfirm) {
    closeModalConfirm.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Cerrar modal al hacer clic fuera de él
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

//------------------------------------------------------------------------
// Cuenta regresiva
const countdown = document.getElementById('countdown');
const targetDate = new Date('2025-12-15T19:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference < 0) {
    countdown.innerHTML = '<p>¡Es hoy!</p>';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  countdown.innerHTML = `
    <div class="time">
      <div class="time-unit">
        <span class="number">${days}</span>
        <span class="label">días</span>
      </div>
      <div class="time-unit">
        <span class="number">${hours}</span>
        <span class="label">hs</span>
      </div>
      <div class="time-unit">
        <span class="number">${minutes}</span>
        <span class="label">min</span>
      </div>
      <div class="time-unit">
        <span class="number">${seconds}</span>
        <span class="label">seg</span>
      </div>
    </div>
  `;
}

setInterval(updateCountdown, 1000);

//------------------------------------------------------------------------
// Agregar al calendario
function addToCalendar() {
  window.open(
    'https://calendar.google.com/calendar/u/0/r/eventedit?...',
    '_blank'
  );
}

//------------------------------------------------------------------------
// Album de Fotos
let slideIndex = 1;

/* Abre el modal */
function openModal() {
  document.getElementById('myModal').style.display = 'flex';
  showSlides(slideIndex);
}

/* Cierra el modal */
function closeModal() {
  document.getElementById('myModal').style.display = 'none';
  slideIndex = 1; // Opcional: reinicia el índice al cerrar
}

/* Cambia de imagen */
function plusSlides(n) {
  showSlides((slideIndex += n));
}

/* Muestra la imagen actual */
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let slides = document.getElementsByClassName('mySlides');
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let slide of slides) {
    slide.style.display = 'none'; // Oculta todas las imágenes inicialmente
  }

  slides[slideIndex - 1].style.display = 'block'; // Muestra solo la imagen actual
}

//------------------------------------------------------------------------
// Regalos
// Función para mostrar el modal
function mostrarModal() {
  const modal = document.getElementById('modalRegalo');
  modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById('modalRegalo');
  modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
const modalRegalo = document.getElementById('modalRegalo');
window.addEventListener('click', (e) => {
  if (e.target === modalRegalo) {
    modalRegalo.style.display = 'none';
  }
});

// Función para copiar el CBU desde el modal
function copiarCBUModal() {
  const cbuInput = document.getElementById('GfGInput');
  navigator.clipboard.writeText(cbuInput.value).then(() => {
    alert('CBU copiado al portapapeles.');
  });
}
