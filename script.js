/* Intro */
document.addEventListener('DOMContentLoaded', function () {
  const cortina = document.getElementById('cortina');
  const body = document.querySelector('body');

  cortina.addEventListener('click', function () {
    // Agrega una clase para la animación de apertura
    cortina.classList.add('abrir-cortina');

    // Opcional: Evita el scroll mientras está cerrada
    body.style.overflow = 'auto';

    const audio = document.getElementById('player');
    audio.play().catch((error) => {
      console.warn('Error al intentar reproducir el audio:', error);
    });

    const button = document.getElementById('button');
    button.innerHTML =
      "<div class='icon'><img src='./img/play.gif' alt='Play Icon'/></div>";
  });

  //------------------------------------------------------------------------
  /* Portada*/
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

  document
    .getElementById('form-confirm')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Evita el envío normal del formulario

      const nombre = document.getElementById('nombre').value;
      const asistencia = document.querySelector(
        'input[name="asistencia"]:checked'
      ).value;
      const mensaje = `Hola, soy ${nombre}. Confirmo que ${
        asistencia === 'si' ? 'asistiré' : 'no asistiré'
      } a la boda.`;

      // Enlace de WhatsApp
      const linkWhatsApp = `https://wa.me/5493513106413?text=${encodeURIComponent(
        mensaje
      )}`;
      window.open(linkWhatsApp, '_blank');

      // Envía los datos al script de Google Sheets
      fetch(
        'https://script.google.com/macros/s/AKfycbxTzThoLgu8vBbWH1QehQxQNlpvkx8gamJhS1mgGIEU6eh-njoOm5_m2DnNdzy14ZKn/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre,
            asistencia,
            menu: document.getElementById('menu').value,
            acompanantes: document.getElementById('acompanantes').value,
            comentarios: document.getElementById('comentarios').value,
          }),
        }
      ).then((response) => {
        if (response.ok) {
          alert('Datos enviados correctamente.');
        } else {
          alert('Hubo un error al enviar los datos.');
        }
      });
    });
});

//------------------------------------------------------------------------
// Cuenta regresiva
const countdown = document.getElementById('countdown');
const targetDate = new Date('2025-12-15T19:30:00').getTime();

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
